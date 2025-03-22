const User = require('../models/User');

// 지갑 등록 API: user_id, wallet address, token balance 업데이트
exports.registerWallet = async (req, res) => {
  try {
    const { user_id, user_wallet_address, user_token_balance } = req.body;
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({ message: 'Invalid user_id. User does not exist.' });
    }
    user.user_wallet_address = user_wallet_address;
    user.user_token_balance = user_token_balance;
    await user.save();
    res.status(200).json({ message: 'Wallet registered successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
