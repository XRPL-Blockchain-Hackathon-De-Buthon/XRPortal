import * as xrpl from 'xrpl';
import { Buffer } from 'buffer';

const PLATFORM_WALLET_ADDRESS = '';

const TESTNET_URL = "wss://s.altnet.rippletest.net:51233";
export async function connectClient() {
  const client = new xrpl.Client(TESTNET_URL);
  await client.connect();
  return client;
}

export async function createWallet(client) {
  const { wallet } = await client.fundWallet();
  console.log(wallet);
  
  return wallet;
}

export async function mintNFT(client, wallet, taxon = 1, name = "", description = "", externalUrl = "", attributes = []) {
  // NFT 메타데이터 설정
  const metadata = {
    name: name,
    description: description,
    format: "markdown",
    content_url: externalUrl,
    attributes: attributes
  };

  // URI 생성 (hex로 인코딩된 JSON)
  const uri = Buffer.from(JSON.stringify(metadata, null, 2), 'utf-8').toString('hex');

  // 트랜잭션 준비
  const tx = {
    TransactionType: "NFTokenMint",
    Account: wallet.address,
    NFTokenTaxon: taxon,
    Flags: xrpl.NFTokenMintFlags.tfTransferable,
    URI: uri
  };

  // 트랜잭션을 자동으로 채우고 서명
  const prepared = await client.autofill(tx);
  const signed = wallet.sign(prepared);

  // 제출하고 결과 반환
  return await client.submitAndWait(signed.tx_blob);
}

export async function getMyNFTs(client, address) {
  const result = await client.request({
    command: "account_nfts",
    account: address
  });
  return result.result.account_nfts;
}

export async function getNFTOffers(client, nftId) {
  const result = await client.request({
    command: "nft_sell_offers",
    nft_id: nftId
  });
  return result.result.offers || [];
}

export async function acceptOffer(client, wallet, offerId) {
  const tx = {
    TransactionType: "NFTokenAcceptOffer",
    Account: wallet.address,
    NFTokenSellOffer: offerId
  };
  const prepared = await client.autofill(tx);
  const signed = wallet.sign(prepared);
  return await client.submitAndWait(signed.tx_blob);
}

export async function buyToken(client, wallet, tokenAmount) {
  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: wallet.address,
    Amount: tokenAmount
  };
  const prepared = await client.autofill(tx);
  const signed = wallet.sign(prepared);
  return await client.submitAndWait(signed.tx_blob);
}

export async function getDBTSellOffers(client, issuerAddress, currency = "dbt") {
  const allOffers = await getTokenOffers(client, 'r4KPjRMYxBQa8xcgQ7qT2DzUmfquS8ssEs');
  return allOffers.filter(offer => {
    return offer.taker_gets?.currency === currency && offer.taker_gets?.issuer === 'r4KPjRMYxBQa8xcgQ7qT2DzUmfquS8ssEs';
  });
}

export async function acceptDBTOffer(client, wallet, dbtOffer) {
  const tx = {
    TransactionType: "OfferCreate",
    Account: wallet.address,
    TakerGets: dbtOffer.taker_pays,
    TakerPays: dbtOffer.taker_gets,
    Flags: 0x80000000 // tfPassive
  };
  const prepared = await client.autofill(tx);
  const signed = wallet.sign(prepared);
  return await client.submitAndWait(signed.tx_blob);
}

export async function getTokenOffers(client, address) {
  const result = await client.request({
    command: "account_offers",
    account: address
  });
  return result.result.offers || [];
}
