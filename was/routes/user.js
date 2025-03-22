const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: 유저
 *   description: 유저 관련 API
 */

/**
 * @swagger
 * /users/signup:
 *   post:
 *     tags: [유저]
 *     summary: 회원가입
 *     description: 유저 이름, 이메일, 비밀번호를 입력하여 회원가입합니다. (지갑 정보는 별도의 지갑 등록 API에서 처리)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *               user_email:
 *                 type: string
 *               user_pw:
 *                 type: string
 *             example:
 *               user_name: "홍길동"
 *               user_email: "hong@example.com"
 *               user_pw: "password123"
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post('/signup', userController.signup);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: [유저]
 *     summary: 로그인
 *     description: 이메일과 비밀번호를 입력하여 로그인합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_email:
 *                 type: string
 *               user_pw:
 *                 type: string
 *             example:
 *               user_email: "hong@example.com"
 *               user_pw: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /users/me:
 *   get:
 *     tags: [유저]
 *     summary: 내 정보 조회
 *     description: user_id 쿼리 파라미터를 통해 내 정보를 조회합니다.
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 사용자 ID
 *     responses:
 *       200:
 *         description: User information
 */
router.get('/me', userController.getMe);

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [유저]
 *     summary: 전체 유저 목록 조회
 *     description: 전체 유저 목록을 조회합니다.
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/', userController.getAllUsers);

module.exports = router;
