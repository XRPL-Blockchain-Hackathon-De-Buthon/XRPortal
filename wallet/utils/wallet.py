import time
import json
import os

from xrpl.wallet import Wallet, generate_faucet_wallet
from xrpl.clients import JsonRpcClient
from xrpl.models.transactions import Payment, TrustSet, OfferCreate
from xrpl.transaction import autofill, autofill_and_sign, submit_and_wait, XRPLReliableSubmissionException
from xrpl.models.currencies import IssuedCurrency
from xrpl.models.transactions.nftoken_mint import NFTokenMint, NFTokenMintFlag
from xrpl.models.requests import AccountNFTs, AccountTx
from xrpl.models.transactions.nftoken_create_offer import NFTokenCreateOffer, NFTokenCreateOfferFlag
from xrpl.models.requests import AccountOffers, NFTSellOffers, AccountLines, AccountInfo
from xrpl.models.transactions.nftoken_accept_offer import NFTokenAcceptOffer
from xrpl.utils import drops_to_xrp


class XRPLManager:
    def __init__(self, testnet_url: str = "https://s.altnet.rippletest.net:51234"):
        self.client = JsonRpcClient(testnet_url)
        self.keystore_dir = os.path.join(os.path.abspath(os.getcwd()), "keystore")
        if not os.path.exists(self.keystore_dir):
            os.makedirs(self.keystore_dir, exist_ok=True)
            print(f"Keystore 폴더를 생성했습니다: {self.keystore_dir}")
        else:
            print(f"기존 keystore 폴더 사용: {self.keystore_dir}")
        
        self.issuer_wallet_file = os.path.join(self.keystore_dir, "issuer_wallet_keys.json")
        if os.path.exists(self.issuer_wallet_file):
            with open(self.issuer_wallet_file, "r", encoding="utf-8") as f:
                wallet_data = json.load(f)
            self.issuer_wallet = Wallet(
                wallet_data["public_key"],
                wallet_data["private_key"],
                master_address=wallet_data["address"],
                seed=wallet_data["seed"]
            )
            print(f"Issuer 지갑 키를 로드했습니다: {self.issuer_wallet_file}")
        else:
            self.issuer_wallet = generate_faucet_wallet(client=self.client, debug=True)
            self.save_wallet_keys(self.issuer_wallet, "issuer_wallet_keys.json")
            print("새로운 Issuer 지갑을 생성했습니다.")

    def save_wallet_keys(self, wallet: Wallet, filename: str) -> None:
        """
        지갑 생성 시 생성된 프라이빗 키(여기서는 seed와 함께 private/public key)를
        keystore 폴더 내 지정 파일에 저장합니다.
        """
        file_path = os.path.join(self.keystore_dir, filename)
        wallet_data = {
            "address": wallet.address,
            "seed": wallet.seed,
            "private_key": wallet.private_key,
            "public_key": wallet.public_key
        }
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(wallet_data, f, ensure_ascii=False, indent=2)
        print(f"Wallet keys saved to {file_path}")

    def estimate_fee(self, transaction) -> str:
        """
        예상 수수료를 XRP 단위로 반환합니다.
        """
        try:
            filled_tx = autofill(transaction, self.client)
            fee_drops = filled_tx.fee  # 수수료 단위: drops
            return drops_to_xrp(fee_drops)  # XRP 단위로 변환
        except Exception as e:
            print(f"수수료 예측 중 오류 발생: {e}")
            return None

    def submit_transaction(self, wallet: Wallet, transaction, check_fee: bool = True) -> dict:
        signed_tx = autofill_and_sign(transaction=transaction, client=self.client, wallet=wallet, check_fee=check_fee)
        signed_tx.validate()
        response = submit_and_wait(transaction=signed_tx, client=self.client, wallet=wallet)
        if not response.is_successful():
            raise XRPLReliableSubmissionException(response.result)
        return response.result

    def set_trust_line(self, wallet: Wallet, token_symbol: str, issuer_address: str, limit: str | int, **kwargs) -> dict:
        issued_currency = IssuedCurrency(currency=token_symbol, issuer=issuer_address)
        limit_amount = issued_currency.to_amount(value=str(limit))
        trust_set_tx = TrustSet(
            account=wallet.address,
            limit_amount=limit_amount,
            **kwargs,
        )
        return self.submit_transaction(wallet, trust_set_tx)

    def send_token(self, wallet: Wallet, destination_address: str, token_symbol: str, issuer_address: str, amount: str | int, **kwargs) -> dict:
        issued_currency = IssuedCurrency(currency=token_symbol, issuer=issuer_address)
        token_amount = issued_currency.to_amount(value=str(amount))
        payment_tx = Payment(
            account=wallet.address,
            amount=token_amount,
            send_max=token_amount,
            destination=destination_address,
            **kwargs,
        )
        return self.submit_transaction(wallet, payment_tx)
    
    def create_sell_dbt_offer(self, amount: int) -> dict:
        """
        dbt를 판매하는 오퍼 생성 (dbt → XRP)
        """
        issuer = self.issuer_wallet.address
        taker_gets_dbt = IssuedCurrency(currency="dbt", issuer=issuer).to_amount(str(amount))
        taker_pays_xrp = str(amount * 1_000_000)  # drops 단위

        offer_tx = OfferCreate(
            account=issuer,
            taker_gets=taker_gets_dbt,
            taker_pays=taker_pays_xrp
        )
        return self.submit_transaction(self.issuer_wallet, offer_tx)
    
    def create_buy_dbt_offer(self, amount: int) -> dict:
        """
        dbt를 구매하는 오퍼 생성 (XRP → dbt)
        """
        issuer = self.issuer_wallet.address
        taker_gets_xrp = str(amount * 1_000_000)
        taker_pays_dbt = IssuedCurrency(currency="dbt", issuer=issuer).to_amount(str(amount))

        offer_tx = OfferCreate(
            account=issuer,
            taker_gets=taker_gets_xrp,
            taker_pays=taker_pays_dbt
        )
        return self.submit_transaction(self.issuer_wallet, offer_tx)

    def get_transactions_by_address(
        self,
        address: str,
        limit: int = 200,
        ledger_index_min: int = -1,
        ledger_index_max: int = -1,
        forward: bool = False
    ) -> list:
        """
        특정 계정의 트랜잭션 내역을 전부 가져옵니다.
        
        :param address: 조회하려는 XRPL 계정 주소
        :param limit: 한 번의 요청에서 가져올 최대 트랜잭션 개수(기본 200)
        :param ledger_index_min: 조회 시작 레저 (기본 -1, 즉 "가장 과거"의 레저)
        :param ledger_index_max: 조회 종료 레저 (기본 -1, 즉 "가장 최근"의 레저)
        :param forward: True면 오래된 순으로 조회, False면 최신 순으로 조회
        :return: 트랜잭션 객체(dict)들의 리스트
        """
        all_txs = []
        marker = None

        while True:
            # AccountTx 요청 생성
            req = AccountTx(
                account=address,
                ledger_index_min=ledger_index_min,
                ledger_index_max=ledger_index_max,
                limit=limit,
                forward=forward,
                marker=marker
            )
            response = self.client.request(req)
            result = response.result

            # 이번 호출에서 가져온 트랜잭션들
            transactions_chunk = result.get("transactions", [])
            all_txs.extend(transactions_chunk)

            # 다음 페이지가 있는지(marker) 확인
            marker = result.get("marker")
            if not marker:
                # 더 이상 다음 페이지가 없으면 반복 종료
                break

        return all_txs


    def mint_nft(
        self,
        wallet: Wallet,
        nft_taxon: int = 1,
        flags: NFTokenMintFlag = NFTokenMintFlag.TF_TRANSFERABLE,
        name: str = "",
        description: str = "",
        external_url: str = "",
        attributes: list = None
    ) -> dict:
        metadata = {
            "name": name,
            "description": description,
            "format": "markdown",
            "content_url": external_url,
            "attributes": attributes or []
        }
        uri = json.dumps(metadata, separators=(',', ':')).encode("utf-8").hex()
        mint_tx = NFTokenMint(
            account=wallet.address,
            nftoken_taxon=nft_taxon,
            flags=flags,
            uri=uri
        )
        return self.submit_transaction(wallet, mint_tx)
    
    def estimate_mint_nft_fee(
        self,
        wallet: Wallet,
        nft_taxon: int = 1,
        flags: NFTokenMintFlag = NFTokenMintFlag.TF_TRANSFERABLE,
        name: str = "",
        description: str = "",
        external_url: str = "",
        attributes: list = None
    ) -> str:
        """
        NFT 민팅에 필요한 예상 수수료(XRP)를 계산합니다. 실제 트랜잭션은 제출되지 않습니다.
        """
        metadata = {
            "name": name,
            "description": description,
            "format": "markdown",
            "content_url": external_url,
            "attributes": attributes or []
        }
        uri = json.dumps(metadata, separators=(',', ':')).encode("utf-8").hex()
        mint_tx = NFTokenMint(
            account=wallet.address,
            nftoken_taxon=nft_taxon,
            flags=flags,
            uri=uri
        )
        return self.estimate_fee(mint_tx)


    def get_nfts_by_address(self, address: str) -> list:
        request = AccountNFTs(account=address)
        response = self.client.request(request)
        return response.result.get("account_nfts", [])

    def create_nft_offer(self, wallet: Wallet, nftoken_id: str, amount, is_sell_offer: bool = True, destination: str = None) -> dict:
        flags = NFTokenCreateOfferFlag.TF_SELL_NFTOKEN if is_sell_offer else 0
        tx_params = {
            "account": wallet.address,
            "nftoken_id": nftoken_id,
            "amount": amount,
            "flags": flags
        }
        if not is_sell_offer and destination:
            tx_params["destination"] = destination
        offer_tx = NFTokenCreateOffer(**tx_params)
        return self.submit_transaction(wallet, offer_tx)

    def get_offers_by_address(self, address: str) -> dict:
        request = AccountOffers(
            account=address,
            ledger_index="validated"
        )
        response = self.client.request(request)
        return response.result

    def get_nft_sell_offers(self, nftoken_id: str) -> dict:
        request = NFTSellOffers(nft_id=nftoken_id)
        response = self.client.request(request)
        return response.result

    def get_all_nft_sell_offers(self, nftoken_ids: list) -> dict:
        results = {}
        for nftoken_id in nftoken_ids:
            offers_result = self.get_nft_sell_offers(nftoken_id)
            results[nftoken_id] = offers_result
        return results

    def accept_nft_offer(self, wallet: Wallet, offer_id: str) -> dict:
        accept_tx = NFTokenAcceptOffer(
            account=wallet.address,
            nftoken_sell_offer=offer_id
        )
        return self.submit_transaction(wallet, accept_tx)
    
    def estimate_send_token_fee(
        self,
        wallet: Wallet,
        destination_address: str,
        token_symbol: str,
        issuer_address: str,
        amount: str | int,
        **kwargs
    ) -> str:
        issued_currency = IssuedCurrency(currency=token_symbol, issuer=issuer_address)
        token_amount = issued_currency.to_amount(value=str(amount))
        payment_tx = Payment(
            account=wallet.address,
            amount=token_amount,
            send_max=token_amount,
            destination=destination_address,
            **kwargs,
        )
        return self.estimate_fee(payment_tx)

    def estimate_accept_nft_offer_fee(self, wallet: Wallet, offer_id: str) -> str:
        accept_tx = NFTokenAcceptOffer(
            account=wallet.address,
            nftoken_sell_offer=offer_id
        )
        return self.estimate_fee(accept_tx)

    def get_dbt_offers_by_issuer(self) -> list:
        issuer = self.issuer_wallet.address
        req = AccountOffers(account=issuer, ledger_index="validated")
        response = self.client.request(req)
        all_offers = response.result.get("offers", [])

        dbt_offers = []

        for offer in all_offers:
            taker_gets = offer.get("taker_gets")
            taker_pays = offer.get("taker_pays")

            if isinstance(taker_gets, dict) and taker_gets.get("currency") == "dbt":
                direction = "Sell dbt (받고 XRP)"
                amount = taker_gets.get("value")
            elif isinstance(taker_pays, dict) and taker_pays.get("currency") == "dbt":
                direction = "Buy dbt (주고 XRP)"
                amount = taker_pays.get("value")
            else:
                continue

            dbt_offers.append({
                "offer_id": offer.get("seq"),
                "ledger_index": offer.get("index"),
                "direction": direction,
                "amount": amount,
                "taker_gets": taker_gets,
                "taker_pays": taker_pays,
                "flags": offer.get("flags")
            })

        return dbt_offers

    def get_all_dbt_offers_by_issuer(self) -> list:
        issuer = self.issuer_wallet.address
        req = AccountOffers(account=issuer, ledger_index="validated")
        response = self.client.request(req)
        all_offers = response.result.get("offers", [])

        dbt_offers = []

        for offer in all_offers:
            taker_gets = offer.get("taker_gets")
            taker_pays = offer.get("taker_pays")

            def is_dbt(obj):
                return isinstance(obj, dict) and obj.get("currency", "").lower() == "dbt"

            is_sell_dbt = is_dbt(taker_gets)
            is_buy_dbt = is_dbt(taker_pays)

            if is_sell_dbt or is_buy_dbt:
                direction = "Sell dbt (받고 XRP)" if is_sell_dbt else "Buy dbt (주고 XRP)"
                amount = taker_gets.get("value") if is_sell_dbt else taker_pays.get("value")

                dbt_offers.append({
                    "offer_id": offer.get("seq"),
                    "ledger_index": offer.get("index", offer.get("offer_id", "unknown")),
                    "direction": direction,
                    "amount": amount,
                    "taker_gets": taker_gets,
                    "taker_pays": taker_pays,
                    "flags": offer.get("flags", 0)
                })

        return dbt_offers

    def get_all_offers_by_issuer(self) -> list:
        """
        issuer_wallet이 올린 모든 오퍼 (필터 없음)
        """
        issuer = self.issuer_wallet.address
        req = AccountOffers(account=issuer, ledger_index="validated")
        response = self.client.request(req)
        all_offers = response.result.get("offers", [])

        formatted_offers = []

        for offer in all_offers:
            taker_gets = offer.get("taker_gets")
            taker_pays = offer.get("taker_pays")

            # 방향 감지 (XRP는 string으로 오고, 토큰은 dict로 옴)
            direction = "Sell Token" if isinstance(taker_gets, dict) else "Buy Token"
            amount = (
                taker_gets.get("value") if isinstance(taker_gets, dict)
                else taker_pays.get("value") if isinstance(taker_pays, dict)
                else "unknown"
            )

            formatted_offers.append({
                "offer_id": offer.get("seq"),
                "ledger_index": offer.get("index", "unknown"),
                "direction": direction,
                "amount": amount,
                "taker_gets": taker_gets,
                "taker_pays": taker_pays,
                "flags": offer.get("flags", 0)
            })

        return formatted_offers

    def get_assets_by_address(self, address: str) -> dict:
        result = {}

        # XRP 잔액 확인
        try:
            acct_info = AccountInfo(
                account=address,
                ledger_index="validated"
            )
            response = self.client.request(acct_info)
            xrp_balance_drops = response.result["account_data"]["Balance"]
            result["XRP"] = int(xrp_balance_drops) / 1_000_000  # drops → XRP
        except Exception as e:
            result["XRP"] = f"오류: {e}"

        # TrustLine 기반 자산 확인
        try:
            lines_req = AccountLines(account=address)
            lines_res = self.client.request(lines_req)
            trust_lines = lines_res.result.get("lines", [])
            issued_assets = []
            for line in trust_lines:
                issued_assets.append({
                    "currency": line["currency"],
                    "issuer": line["account"],
                    "balance": line["balance"],
                    "limit": line["limit"]
                })
            result["issued_tokens"] = issued_assets
        except Exception as e:
            result["issued_tokens"] = f"오류: {e}"

        return result

    def print_section(self, title: str):
        print("\n" + "=" * len(title))
        print(title)
        print("=" * len(title))

    def decode_nft_uri(self, uri: str) -> dict:
        try:
            decoded_str = bytes.fromhex(uri).decode("utf-8")
            return json.loads(decoded_str)
        except Exception as e:
            print("Decoding error:", e)
            return None

    def run(self):
        # 판매자 지갑(self.issuer_wallet)는 __init__에서 이미 생성 또는 로드됨

        #############################
        # 1. Friend (구매자) 지갑 생성
        #############################
        self.print_section("Friend (구매자) 지갑 생성")
        friend_wallet = generate_faucet_wallet(client=self.client, debug=True)
        print("Friend Wallet Address:", friend_wallet.address)
        friend_wallet_file = "friend_wallet_keys.json"
        with open(friend_wallet_file, "w", encoding="utf-8") as f:
            json.dump(
                {"address": friend_wallet.address, "seed": friend_wallet.seed,
                 "private_key": friend_wallet.private_key, "public_key": friend_wallet.public_key},
                f,
                ensure_ascii=False,
                indent=2
            )
        print(f"Friend wallet keys saved to {friend_wallet_file}")

        #########################################
        # 2. Friend가 dbt 토큰을 수신할 수 있도록 TrustLine 설정
        #########################################
        self.print_section("Friend dbt 토큰 TrustLine 설정")
        trust_result = self.set_trust_line(
            wallet=friend_wallet,
            token_symbol="dbt",
            issuer_address=self.issuer_wallet.address,
            limit="10"
        )
        print("TrustLine 설정 결과:")
        print(json.dumps(trust_result, indent=2, ensure_ascii=False))

        #########################################
        # 3. Issuer가 Friend에게 dbt 토큰 전송 (예: 10 dbt)
        #########################################
        self.print_section("Issuer가 Friend에게 dbt 토큰 전송")
        send_result = self.send_token(
            wallet=self.issuer_wallet,
            destination_address=friend_wallet.address,
            token_symbol="dbt",
            issuer_address=self.issuer_wallet.address,
            amount="10"
        )
        print("dbt 토큰 전송 결과:")
        print(json.dumps(send_result, indent=2, ensure_ascii=False))

        #########################################
        # 4. Issuer가 NFT 민팅 (커스텀 메타데이터 포함)
        #########################################
        self.print_section("NFT 민팅 - 커스텀 메타데이터 포함")
        name = "Blog Post"
        description = "hello"
        external_url = "https://myblog.example.com/post/123"
        attributes = [
            {"trait_type": "Author", "value": "John Doe"},
            {"trait_type": "Published Date", "value": "2025-03-22"}
        ]
        nft_result = self.mint_nft(
            wallet=self.issuer_wallet,
            nft_taxon=1,
            name=name,
            description=description,
            external_url=external_url,
            attributes=attributes
        )
        print("NFT 민팅 결과:")
        print(json.dumps(nft_result, indent=2, ensure_ascii=False))

        #########################################
        # 5. Issuer의 NFT 조회
        #########################################
        self.print_section("Issuer 지갑의 NFT 조회 (URI 디코딩 포함)")
        issuer_nfts = self.get_nfts_by_address(self.issuer_wallet.address)
        if issuer_nfts:
            for i, nft in enumerate(issuer_nfts, start=1):
                print(f"\n NFT {i}:")
                for key, value in nft.items():
                    if key.lower() == "uri":
                        decoded_metadata = self.decode_nft_uri(value)
                        if decoded_metadata:
                            print(f"   {key}:")
                            print(json.dumps(decoded_metadata, indent=2, ensure_ascii=False))
                        else:
                            print(f"   {key}: {value} (디코딩 실패)")
                    else:
                        print(f"   {key}: {value}")
        else:
            print("현재 Issuer가 보유한 NFT가 없습니다.")

        #########################################
        # 6. Issuer가 NFT를 dbt 3개에 판매하는 오퍼 생성
        #########################################
        self.print_section("Issuer NFT Offer 생성 (dbt 3개에 판매)")
        offer_id = None
        if issuer_nfts:
            nft = issuer_nfts[0]
            nftoken_id = nft.get("NFTokenID")
            if not nftoken_id:
                print("NFT Token ID를 찾을 수 없습니다.")
            else:
                print("사용할 NFT Token ID:", nftoken_id)
                dbt_amount = {
                    "currency": "dbt",
                    "issuer": self.issuer_wallet.address,
                    "value": "3"
                }
                offer_result = self.create_nft_offer(
                    wallet=self.issuer_wallet,
                    nftoken_id=nftoken_id,
                    amount=dbt_amount,
                    is_sell_offer=True
                )
                print("NFT 오퍼 생성 결과:")
                print(json.dumps(offer_result, indent=2, ensure_ascii=False))
        else:
            print("NFT가 없어 오퍼를 생성할 수 없습니다.")

        #########################################
        # 7. Friend가 해당 NFT의 판매 오퍼 조회
        #########################################
        self.print_section("Friend: 특정 NFT의 판매 오퍼 조회")
        if issuer_nfts:
            nft = issuer_nfts[0]
            nftoken_id = nft.get("NFTokenID")
            if nftoken_id:
                nft_sell_offers = self.get_nft_sell_offers(nftoken_id)
                print("판매 오퍼 조회 결과:")
                print(json.dumps(nft_sell_offers, indent=2, ensure_ascii=False))
                offers_list = nft_sell_offers.get("offers", [])
                if offers_list:
                    offer_id = offers_list[0].get("nft_offer_index")
                    print("수락할 오퍼 ID:", offer_id)
                else:
                    print("판매 오퍼가 존재하지 않습니다.")
            else:
                print("NFT Token ID를 찾을 수 없습니다.")
        else:
            print("NFT가 없어 오퍼 조회를 할 수 없습니다.")

        #########################################
        # 8. Friend가 오퍼 수락하여 NFT 구매 (dbt 3개 지불)
        #########################################
        if offer_id:
            self.print_section("Friend: 오퍼 수락 (NFT 구매)")
            accept_result = self.accept_nft_offer(wallet=friend_wallet, offer_id=offer_id)
            print("오퍼 수락 결과:")
            print(json.dumps(accept_result, indent=2, ensure_ascii=False))
        else:
            print("수락할 오퍼 ID가 없어 거래를 진행할 수 없습니다.")

        #########################################
        # 9. Friend 지갑의 NFT 보유 여부 확인
        #########################################
        self.print_section("Friend 지갑의 NFT 조회 (구매 후)")
        friend_nfts = self.get_nfts_by_address(friend_wallet.address)
        if friend_nfts:
            print("Friend가 보유한 NFT:")
            for i, nft in enumerate(friend_nfts, start=1):
                print(f"\n NFT {i}:")
                for key, value in nft.items():
                    if key.lower() == "uri":
                        decoded_metadata = self.decode_nft_uri(value)
                        if decoded_metadata:
                            print(f"   {key}:")
                            print(json.dumps(decoded_metadata, indent=2, ensure_ascii=False))
                        else:
                            print(f"   {key}: {value} (디코딩 실패)")
                    else:
                        print(f"   {key}: {value}")
        else:
            print("Friend 지갑에 NFT가 없습니다.")


if __name__ == "__main__":
    manager = XRPLManager()
    manager.run()
