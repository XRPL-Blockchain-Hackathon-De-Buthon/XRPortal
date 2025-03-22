const { Op } = require('sequelize');
const Transaction = require('../models/Transaction');

// 토큰 변화 내역 조회 API
// - 특정 user_id(판매자 또는 구매자)에 해당하는 모든 거래 내역을 반환합니다.
exports.getUserTransactions = async (req, res) => {
  try {
    const user_id = req.query.user_id;
    if (!user_id) return res.status(400).json({ message: "user_id is required" });
    
    const transactions = await Transaction.findAll({
      where: {
        [Op.or]: [
          { seller_id: user_id },
          { buyer_id: user_id }
        ]
      }
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 특정 게시글 거래 내역 조회 API
// - 특정 게시글(post_id)에 대한 거래 내역을 모두 반환합니다.
exports.getPostTransactions = async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const transactions = await Transaction.findAll({
      where: { post_id }
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
