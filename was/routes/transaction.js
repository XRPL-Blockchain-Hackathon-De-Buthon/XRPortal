const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

/**
 * @swagger
 * tags:
 *   name: 트랜잭션
 *   description: 토큰 거래 내역 관련 API
 */

/**
 * @swagger
 * /transactions/read:
 *   get:
 *     tags: [트랜잭션]
 *     summary: 토큰 변화 내역 조회
 *     description: 특정 사용자(user_id)의 모든 토큰 거래 내역을 조회합니다.
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 사용자 ID
 *     responses:
 *       200:
 *         description: 거래 내역 목록 반환
 */
router.get('/read', transactionController.getUserTransactions);

/**
 * @swagger
 * /transactions/post/{post_id}:
 *   get:
 *     tags: [트랜잭션]
 *     summary: 특정 게시글 거래 내역 조회
 *     description: 특정 게시글(post_id)의 거래 내역을 모두 조회합니다.
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 게시글 ID
 *     responses:
 *       200:
 *         description: 게시글 거래 내역 목록 반환
 */
router.get('/post/:post_id', transactionController.getPostTransactions);

module.exports = router;
