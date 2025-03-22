const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');

/**
 * @swagger
 * tags:
 *   name: 지갑
 *   description: 지갑 등록 및 관리 API
 */

/**
 * @swagger
 * /wallet/register:
 *   post:
 *     tags: [지갑]
 *     summary: 지갑 등록 API
 *     description: user_id, wallet address, token balance를 등록합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               user_wallet_address:
 *                 type: string
 *               user_token_balance:
 *                 type: number
 *     responses:
 *       200:
 *         description: Wallet registered successfully
 */
router.post('/register', walletController.registerWallet);

module.exports = router;
