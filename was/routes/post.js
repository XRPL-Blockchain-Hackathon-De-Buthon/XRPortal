const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

/**
 * @swagger
 * tags:
 *   name: 게시글
 *   description: 게시글 관련 API
 */

/**
 * @swagger
 * /posts/create:
 *   post:
 *     tags: [게시글]
 *     summary: 게시글 생성
 *     description: 제목, 내용, writer_id, gas_fee, nft_id를 입력하여 게시글을 생성합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               post_title:
 *                 type: string
 *               post_content:
 *                 type: string
 *               writer_id:
 *                 type: integer
 *               gas_fee:
 *                 type: number
 *               nft_id:
 *                 type: string
 *             example:
 *               post_title: "My First Post"
 *               post_content: "This is the content of the post in markdown format."
 *               writer_id: 1
 *               gas_fee: 0.001
 *               nft_id: "NFT123456"
 *     responses:
 *       201:
 *         description: Post created successfully
 */
router.post('/create', postController.createPost);

/**
 * @swagger
 * /posts/{post_id}/saleStart:
 *   post:
 *     tags: [게시글]
 *     summary: 판매 시작 API
 *     description: post_id, price, gas_fee를 입력받아 해당 게시글의 판매 상태를 false에서 true로 변경하고 가격 정보를 설정합니다.
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 게시글 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *               gas_fee:
 *                 type: number
 *     responses:
 *       200:
 *         description: Sale started successfully
 */
router.post('/:post_id/saleStart', postController.saleStart);

/**
 * @swagger
 * /posts/{post_id}/read:
 *   get:
 *     tags: [게시글]
 *     summary: 게시글 조회 (조회수 증가 포함)
 *     description: writer와 owner의 id, 이름 및 판매 상태를 포함하여 게시글 정보를 반환합니다.
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 게시글 ID
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 */
router.get('/:post_id/read', postController.readPost);

/**
 * @swagger
 * /posts/all:
 *   get:
 *     tags: [게시글]
 *     summary: 전체 게시글 조회 API
 *     description: 정렬 기준(좋아요, 조회수, 최신, 판매)을 선택하여 전체 게시글을 조회합니다. 반환 결과에는 writer와 owner의 id, 이름, 판매 상태, 좋아요 수 등이 포함됩니다.
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: 정렬 기준 (likes, views, latest, sale)
 *     responses:
 *       200:
 *         description: List of posts with details
 */
router.get('/all', postController.getAllPosts);

/**
 * @swagger
 * /posts/{post_id}/purchase:
 *   post:
 *     tags: [게시글]
 *     summary: 게시글 구매 API
 *     description: 판매 시작 API에서 설정한 가격을 기준으로 게시글 구매 처리 (구매자 토큰 차감, 판매자 토큰 증가, 거래 기록).
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 게시글 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               buyer_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Post purchased successfully
 */
router.post('/:post_id/purchase', postController.purchasePost);

/**
 * @swagger
 * /posts/{post_id}/like:
 *   post:
 *     tags: [게시글]
 *     summary: 게시글 좋아요 토글 API
 *     description: 동일 user_id가 누를 경우 좋아요를 취소합니다.
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 게시글 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Like toggled successfully
 */
router.post('/:post_id/like', postController.likePost);


/**
 * @swagger
 * /posts/user/{user_id}:
 *   get:
 *     tags: [게시글]
 *     summary: 특정 사용자의 게시글 전체 조회 API
 *     description: 특정 사용자(user_id)가 작성하거나 소유한 모든 게시글 정보를 반환합니다.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 사용자 ID
 *     responses:
 *       200:
 *         description: 해당 사용자의 게시글 목록 반환
 */
router.get('/user/:user_id', postController.getUserPosts);
 
module.exports = router;
