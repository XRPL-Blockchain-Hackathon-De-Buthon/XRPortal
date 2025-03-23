import os
import json
import time
import threading
import logging

from flask import Blueprint, jsonify, request
from sqlalchemy.exc import ProgrammingError


from app.models import db, Users, Posts, Transactions


# 이미 구현된 XRPLManager를 import (xrpl 라이브러리는 별도로 import하지 않음)
from utils.wallet import XRPLManager

bp = Blueprint('main', __name__)
manager = XRPLManager()  # XRPLManager 인스턴스 (Issuer 지갑 포함)

logger = logging.getLogger(__name__)



@bp.route('/')
def root():
    return jsonify({"message": "Hello XRPL!"}), 200

@bp.route('/test/error')
def error():
    return jsonify({'data': "500 error"}), 500

@bp.route('/xrpl/mint_nft_with_issuer', methods=['POST'])
def mint_nft_with_issuer():
    """
    Issuer 지갑으로부터 NFT를 민팅하는 예시.
    body:
      {
        "name": "Blog Post",
        "description": "hello",
        "external_url": "https://myblog.example.com/post/123",
        "attributes": [
          {"trait_type": "Author", "value": "John Doe"}
        ]
      }
    """
    data = request.json or {}
    name = data.get("name", "Sample NFT")
    description = data.get("description", "No Description")
    external_url = data.get("external_url", "")
    attributes = data.get("attributes", [])

    try:
        result = manager.mint_nft(
            wallet=manager.issuer_wallet,
            nft_taxon=1,
            name=name,
            description=description,
            external_url=external_url,
            attributes=attributes
        )
        return jsonify({"mint_result": result}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/xrpl/get_issuer_nfts', methods=['GET'])
def get_issuer_nfts():
    """
    Issuer 지갑이 보유한 NFT 목록을 조회 (URI를 decode해서 메타데이터 확인).
    """
    try:
        nfts = manager.get_nfts_by_address(manager.issuer_wallet.address)
        parsed_nfts = []
        for nft_info in nfts:
            nft_copy = dict(nft_info)
            uri_hex = nft_copy.get("URI") or nft_copy.get("uri")
            if uri_hex:
                decoded = manager.decode_nft_uri(uri_hex)
                nft_copy["decoded_uri"] = decoded
            parsed_nfts.append(nft_copy)

        return jsonify({
            "issuer_address": manager.issuer_wallet.address,
            "nfts": parsed_nfts
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/xrpl/get_nfts_by_address', methods=['GET'])
def get_nfts_by_address():
    """
    특정 XRPL 주소의 NFT 목록을 조회.
    Query Parameter 예: ?address=rXXXXXXXXXXXXXXXXX
    """
    address = request.args.get("address")
    if not address:
        return jsonify({"error": "address 쿼리 파라미터가 없습니다."}), 400

    try:
        nfts = manager.get_nfts_by_address(address)
        parsed_nfts = []
        for nft_info in nfts:
            nft_copy = dict(nft_info)
            uri_hex = nft_copy.get("URI") or nft_copy.get("uri")
            if uri_hex:
                decoded = manager.decode_nft_uri(uri_hex)
                nft_copy["decoded_uri"] = decoded
            parsed_nfts.append(nft_copy)

        return jsonify({
            "address": address,
            "nfts": parsed_nfts
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/xrpl/get_nfts_by_addresses', methods=['POST'])
def get_nfts_by_addresses():
    """
    여러 XRPL 주소의 NFT 목록을 일괄 조회합니다.
    body 예시:
    {
        "addresses": [
            "rXXXXXXXXXXXXXXXX",
            "rYYYYYYYYYYYYYYYY"
        ]
    }
    """
    data = request.json or {}
    addresses = data.get("addresses", [])

    if not addresses or not isinstance(addresses, list):
        return jsonify({"error": "유효한 addresses 리스트가 필요합니다."}), 400

    try:
        result = {}
        for address in addresses:
            nfts = manager.get_nfts_by_address(address)
            parsed_nfts = []
            for nft_info in nfts:
                nft_copy = dict(nft_info)
                uri_hex = nft_copy.get("URI") or nft_copy.get("uri")
                if uri_hex:
                    decoded = manager.decode_nft_uri(uri_hex)
                    nft_copy["decoded_uri"] = decoded
                parsed_nfts.append(nft_copy)
            result[address] = parsed_nfts

        return jsonify({"results": result}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/xrpl/create_nft_sell_offer', methods=['POST'])
def create_nft_sell_offer():
    """
    Issuer 지갑의 NFT를 판매하기 위한 오퍼 생성.
    body 예시:
    {
      "nftoken_id": "0008123ABC...등등",
      "amount": {
        "currency": "dbt",
        "issuer": "rIssuerAddress...",
        "value": "5"
      },
      "is_sell_offer": true
    }
    """
    data = request.json or {}
    nftoken_id = data.get("nftoken_id")
    amount = data.get("amount", {})
    is_sell_offer = data.get("is_sell_offer", True)

    if not nftoken_id or not amount:
        return jsonify({"error": "nftoken_id 또는 amount 누락"}), 400

    try:
        result = manager.create_nft_offer(
            wallet=manager.issuer_wallet,
            nftoken_id=nftoken_id,
            amount=amount,
            is_sell_offer=is_sell_offer
        )
        return jsonify({"offer_result": result}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@bp.route('/xrpl/get_sell_offers_for_nft', methods=['GET'])
def get_sell_offers_for_nft():
    """
    특정 NFT의 판매 오퍼 조회.
    query param 예: ?nftoken_id=0008123ABC...
    """
    nftoken_id = request.args.get("nftoken_id")
    if not nftoken_id:
        return jsonify({"error": "nftoken_id 쿼리 파라미터가 없습니다."}), 400

    try:
        offers_info = manager.get_nft_sell_offers(nftoken_id)
        return jsonify({"nftoken_id": nftoken_id, "sell_offers": offers_info}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@bp.route('/xrpl/create_sell_dbt_offer', methods=['POST'])
def api_create_sell_dbt_offer():
    data = request.json or {}
    amount = data.get("amount")
    if not amount:
        return jsonify({"error": "amount 파라미터가 필요합니다."}), 400

    try:
        result = manager.create_sell_dbt_offer(int(amount))
        return jsonify({"sell_dbt_offer_result": result}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@bp.route('/xrpl/create_buy_dbt_offer', methods=['POST'])
def api_create_buy_dbt_offer():
    data = request.json or {}
    amount = data.get("amount")
    if not amount:
        return jsonify({"error": "amount 파라미터가 필요합니다."}), 400

    try:
        result = manager.create_buy_dbt_offer(int(amount))
        return jsonify({"buy_dbt_offer_result": result}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@bp.route('/xrpl/transfer_issuer_token', methods=['POST'])
def transfer_issuer_token():
    """
    Issuer 지갑에서 다른 지갑으로 토큰(dbt 등)을 전송.
    body 예시:
    {
      "destination_address": "rXXXXXX",
      "token_symbol": "dbt",
      "issuer_address": "rYYYYYY",  // 보통 issuer 지갑 주소
      "amount": "10"
    }
    """
    data = request.json or {}
    destination_address = data.get("destination_address")
    token_symbol = data.get("token_symbol")
    issuer_address = data.get("issuer_address")
    amount = data.get("amount")

    # 필수 파라미터 확인
    if not all([destination_address, token_symbol, issuer_address, amount]):
        return jsonify({"error": "필수 파라미터(destination_address, token_symbol, issuer_address, amount) 누락"}), 400

    try:
        tx_result = manager.send_token(
            wallet=manager.issuer_wallet,
            destination_address=destination_address,
            token_symbol=token_symbol,
            issuer_address=issuer_address,
            amount=amount
        )
        return jsonify({"transfer_result": tx_result}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@bp.route('/xrpl/get_issuer_dbt_offers', methods=['GET'])
def get_issuer_dbt_offers():
    """
    issuer_wallet이 등록한 오퍼 중 dbt 관련된 것만 반환
    """
    try:
        offers = manager.get_dbt_offers_by_issuer()
        return jsonify({
            "issuer_address": manager.issuer_wallet.address,
            "dbt_offers": offers
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@bp.route('/xrpl/admin/all_offers', methods=['GET'])
def admin_get_all_offers():
    """
    issuer_wallet이 올린 모든 오퍼를 필터 없이 반환 (dbt 포함 전체)
    """
    try:
        offers = manager.get_all_offers_by_issuer()
        return jsonify({
            "issuer_address": manager.issuer_wallet.address,
            "offers": offers
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@bp.route('/xrpl/admin/dbt_offers', methods=['GET'])
def admin_get_dbt_offers():
    """
    발행자(issuer)가 올린 모든 dbt 관련 오퍼를 관리용으로 조회
    """
    try:
        offers = manager.get_all_dbt_offers_by_issuer()
        return jsonify({
            "issuer_address": manager.issuer_wallet.address,
            "dbt_offers": offers
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/xrpl/get_all_nft_sell_offers', methods=['POST'])
def get_all_nft_sell_offers():
    """
    사용자로부터 NFT ID 목록을 전달받아, 각각에 대한 판매 오퍼를 일괄 조회.
    body 예시:
    {
      "nftoken_ids": [
        "0008123ABC123...",
        "0008123ABC456..."
      ]
    }
    """
    data = request.json or {}
    nftoken_ids = data.get("nftoken_ids", [])

    if not nftoken_ids or not isinstance(nftoken_ids, list):
        return jsonify({"error": "nftoken_ids 리스트가 유효하지 않습니다."}), 400

    try:
        # XRPLManager의 get_all_nft_sell_offers 사용
        results = manager.get_all_nft_sell_offers(nftoken_ids)
        return jsonify({"results": results}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/xrpl/estimate_mint_fee', methods=['POST'])
def estimate_mint_fee():
    """
    NFT 민팅 예상 수수료를 조회하는 API.
    body:
      {
        "name": "Blog Post",
        "description": "hello",
        "external_url": "https://myblog.example.com/post/123",
        "attributes": [
          {"trait_type": "Author", "value": "John Doe"}
        ]
      }
    """
    data = request.json or {}
    name = data.get("name", "Sample NFT")
    description = data.get("description", "No Description")
    external_url = data.get("external_url", "")
    attributes = data.get("attributes", [])

    try:
        estimated_fee = manager.estimate_mint_nft_fee(
            wallet=manager.issuer_wallet,
            nft_taxon=1,
            name=name,
            description=description,
            external_url=external_url,
            attributes=attributes
        )
        return jsonify({"estimated_fee_xrp": estimated_fee}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/xrpl/estimate_send_token_fee', methods=['POST'])
def estimate_send_token_fee():
    """
    토큰 전송 예상 수수료 조회 API
    body 예시:
    {
      "destination_address": "rXXXXXXX",
      "token_symbol": "dbt",
      "issuer_address": "rYYYYYYY",
      "amount": "10"
    }
    """
    data = request.json or {}
    destination_address = data.get("destination_address")
    token_symbol = data.get("token_symbol")
    issuer_address = data.get("issuer_address")
    amount = data.get("amount")

    if not all([destination_address, token_symbol, issuer_address, amount]):
        return jsonify({"error": "필수 파라미터(destination_address, token_symbol, issuer_address, amount) 누락"}), 400

    try:
        fee = manager.estimate_send_token_fee(
            wallet=manager.issuer_wallet,
            destination_address=destination_address,
            token_symbol=token_symbol,
            issuer_address=issuer_address,
            amount=amount
        )
        return jsonify({"estimated_fee_xrp": fee}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/xrpl/estimate_accept_offer_fee', methods=['POST'])
def estimate_accept_offer_fee():
    """
    NFT 오퍼 수락 예상 수수료 조회 API
    body 예시:
    {
      "offer_id": "2F9A8C..."
    }
    """
    data = request.json or {}
    offer_id = data.get("offer_id")

    if not offer_id:
        return jsonify({"error": "offer_id 파라미터가 필요합니다."}), 400

    try:
        # 예: issuer_wallet로 테스트, 실제 수락자는 구매자 지갑이겠지만
        fee = manager.estimate_accept_nft_offer_fee(
            wallet=manager.issuer_wallet,
            offer_id=offer_id
        )
        return jsonify({"estimated_fee_xrp": fee}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/xrpl/get_assets_by_address', methods=['GET'])
def get_assets_by_address():
    """
    특정 XRPL 주소가 보유한 자산(XRP 및 Trust Line 기반 토큰) 조회
    예: /xrpl/get_assets_by_address?address=rXXXXXXXXXXXXXXXX
    """
    address = request.args.get("address")
    if not address:
        return jsonify({"error": "address 쿼리 파라미터가 필요합니다."}), 400

    try:
        assets = manager.get_assets_by_address(address)
        return jsonify({
            "address": address,
            "assets": assets
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/xrpl/get_transactions_by_address', methods=['GET'])
def api_get_transactions_by_address():
    """
    특정 XRPL 주소의 전체 트랜잭션을 조회합니다.
    예시 호출:
      GET /xrpl/get_transactions_by_address?address=rXXXXXX&limit=200&forward=false
    
    Query Params:
      - address (필수): 조회할 XRPL 주소
      - limit (선택): 한 번의 요청에서 가져올 최대 트랜잭션 개수 (default=200)
      - forward (선택): True면 오래된 순, False면 최신 순 (default=False)
      - ledger_index_min (선택): 조회 시작 레저 번호 (기본 -1은 '가장 과거')
      - ledger_index_max (선택): 조회 종료 레저 번호 (기본 -1은 '가장 최근')
    """
    address = request.args.get("address")
    if not address:
        return jsonify({"error": "address 쿼리 파라미터가 필요합니다."}), 400

    # 선택 파라미터
    limit = request.args.get("limit", 200, type=int)
    forward = request.args.get("forward", "false").lower() == "true"
    ledger_index_min = request.args.get("ledger_index_min", -1, type=int)
    ledger_index_max = request.args.get("ledger_index_max", -1, type=int)

    try:
        # XRPLManager 안에 구현된 메서드 호출
        tx_list = manager.get_transactions_by_address(
            address=address,
            limit=limit,
            ledger_index_min=ledger_index_min,
            ledger_index_max=ledger_index_max,
            forward=forward
        )

        # 각 트랜잭션을 필요한 만큼 가공하거나 그대로 반환 가능
        # 여기서는 바로 반환
        return jsonify({
            "address": address,
            "total_count": len(tx_list),
            "transactions": tx_list
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def monitor_db_and_reward(app):
    """
    60초마다 Posts 테이블 전체 레코드를 조회하여
    개수를 로그(WARNING 레벨)로 출력 (DB 연결 확인용).
    """
    while True:
        with app.app_context():
            try:
                all_posts = Posts.query.all()
                logger.warning(f"[monitor_db_and_reward] 현재 Posts 테이블에 {len(all_posts)}개 게시글이 있습니다.")

            except ProgrammingError as pe:
                # 테이블이 없거나, SQL 구문 문제가 발생한 경우
                logger.warning(f"[monitor_db_and_reward] DB 조회 에러 (ProgrammingError): {pe}", exc_info=True)
                logger.warning("[monitor_db_and_reward] 5초 후 재시도합니다...")
                time.sleep(5)  # 테이블 생성 등 대기 후 다시 시도
                continue       # while 루프 시작으로 돌아가기

            except Exception as e:
                # 그 외 에러 발생 시 에러 로깅
                logger.warning(f"[monitor_db_and_reward] DB 조회 에러: {e}", exc_info=True)

        time.sleep(60)

def register_routes(app):
    # Blueprint 등록
    app.register_blueprint(bp)
    
    # 백그라운드 스레드로 DB 모니터링
    monitor_thread = threading.Thread(
        target=monitor_db_and_reward,
        args=(app,),
        daemon=True
    )
    monitor_thread.start()
