const User = require('../models/User');

// 회원가입
exports.signup = async (req, res) => {
  try {
    const { user_name, user_email, user_pw } = req.body;
    const user = await User.create({ user_name, user_email, user_pw });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 로그인 (단순 예제 – 실제 서비스에서는 토큰 발행 등 추가 보안 필요)
exports.login = async (req, res) => {
  try {
    const { user_email, user_pw } = req.body;
    const user = await User.findOne({ where: { user_email, user_pw } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 내 정보 조회 (query로 user_id 전달)
exports.getMe = async (req, res) => {
  try {
    const user_id = req.query.user_id;
    if (!user_id) {
      return res.status(400).json({ message: 'user_id query parameter is required' });
    }
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 전체 유저 목록 조회
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
