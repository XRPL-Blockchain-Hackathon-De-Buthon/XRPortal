const axios = require('axios');
const { Op } = require('sequelize');
const Post = require('../models/Post');

exports.getNftsByUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    if (!user_id) {
      return res.status(400).json({ message: 'user_id is required' });
    }
    // owner_id가 user_id인 게시글 중 nft_id가 존재하는 것들을 조회
    const posts = await Post.findAll({
      where: {
        owner_id: user_id,
        nft_id: { [Op.ne]: null }
      }
    });
    // nft_id만 추출 후, null 또는 빈 값 제거
    const addresses = posts.map(post => post.nft_id).filter(nft => nft);
    const requestBody = { addresses };

    // wallet 서비스에 POST 요청
    const response = await axios.post('http://wallet:4000/xrpl/get_nfts_by_addresses', requestBody);
    
    // wallet 서비스의 응답을 그대로 반환
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
