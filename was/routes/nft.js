const express = require('express');
const router = express.Router();
const nftController = require('../controllers/nftController');

/**
 * @swagger
 * tags:
 *   name: NFT
 *   description: NFT 관련 API
 */

/**
 * @swagger
 * /nfts/user/{user_id}:
 *   get:
 *     tags: [NFT]
 *     summary: 특정 사용자의 NFT 조회 API
 *     description: 특정 사용자의 user_id가 owner_id인 모든 게시글의 nft_id들을 모아,
 *       http://wallet:4000/xrpl/get_nfts_by_addresses 에 POST 요청한 결과를 그대로 반환합니다.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 사용자 ID
 *     responses:
 *       200:
 *         description: NFT 조회 결과
 */
router.get('/user/:user_id', nftController.getNftsByUser);

module.exports = router;
