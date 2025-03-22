const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

/**
 * @swagger
 * tags:
 *   name: 댓글
 *   description: 댓글 관련 API
 */

/**
 * @swagger
 * /comments/create:
 *   post:
 *     tags: [댓글]
 *     summary: 댓글 작성 API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               post_id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *               comment_content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created successfully
 */
router.post('/create', commentController.createComment);

/**
 * @swagger
 * /comments/{comment_id}/likes:
 *   post:
 *     tags: [댓글]
 *     summary: 댓글 좋아요 토글 API
 *     description: 동일 user_id가 다시 누르면 좋아요가 취소됩니다.
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 댓글 ID
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
 *         description: Comment like toggled successfully
 */
router.post('/:comment_id/likes', commentController.likeComment);

/**
 * @swagger
 * /comments/{post_id}/read:
 *   get:
 *     tags: [댓글]
 *     summary: 게시글 댓글 조회 API
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 게시글 ID
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
 */
router.get('/:post_id/read', commentController.readComments);

module.exports = router;
