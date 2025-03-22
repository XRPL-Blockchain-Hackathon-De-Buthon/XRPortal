const Post = require('../models/Post');
const User = require('../models/User');
const PostLike = require('../models/PostLike');
const Transaction = require('../models/Transaction');
const { Op } = require('sequelize');
const crypto = require('crypto');

// 게시글 생성 API (gas_fee와 nft_id 추가)
exports.createPost = async (req, res) => {
  try {
    const { post_title, post_content, writer_id, gas_fee, nft_id } = req.body;
    
    // 작성자 검증
    const writer = await User.findByPk(writer_id);
    if (!writer) {
      return res.status(400).json({ message: 'Invalid writer_id. User does not exist.' });
    }
    
    // 초기에는 owner_id를 writer_id로 설정, sale_status는 false (0)
    const post = await Post.create({
      post_title,
      post_content,
      writer_id,
      owner_id: writer_id,
      sale_status: 0,
      gas_fee,
      nft_id
    });
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 판매 시작 API: post_id, price, gas_fee를 입력받아 판매 상태 변경
exports.saleStart = async (req, res) => {
  try {
    const { post_id, price, gas_fee } = req.body;
    const post = await Post.findByPk(post_id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.sale_status === true) return res.status(400).json({ message: 'Sale already started for this post' });
    
    post.price = price;
    post.gas_fee = gas_fee;
    post.sale_status = true;
    await post.save();
    
    res.json({ message: 'Sale started successfully', post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 게시글 조회 API: writer와 owner의 id 및 이름, sale_status 포함
exports.readPost = async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const post = await Post.findByPk(post_id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    // 조회수 증가
    post.view_count += 1;
    await post.save();
    
    // writer와 owner 이름 조회
    const writer = await User.findByPk(post.writer_id);
    const owner = await User.findByPk(post.owner_id);
    
    const likeCount = await PostLike.count({ where: { post_id } });
    
    const postData = {
      ...post.toJSON(),
      writer_name: writer ? writer.user_name : null,
      owner_name: owner ? owner.user_name : null,
      likeCount
    };
    res.json(postData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 전체 게시글 조회 API: 정렬(좋아요, 조회수, 최신) 및 판매중 필터 적용
exports.getAllPosts = async (req, res) => {
  try {
    let { sort } = req.query;
    let order = [];
    let whereClause = {};

    if (sort === 'likes') {
      // 좋아요 기준 정렬: 모든 게시글을 가져온 후, 각 게시글의 좋아요 수를 계산하여 정렬
      const posts = await Post.findAll();
      const postsWithDetails = await Promise.all(posts.map(async (post) => {
        const likeCount = await PostLike.count({ where: { post_id: post.id } });
        const writer = await User.findByPk(post.writer_id);
        const owner = await User.findByPk(post.owner_id);
        return { 
          ...post.toJSON(),
          writer_name: writer ? writer.user_name : null,
          owner_name: owner ? owner.user_name : null,
          likeCount
        };
      }));
      postsWithDetails.sort((a, b) => b.likeCount - a.likeCount);
      return res.json(postsWithDetails);
    } else if (sort === 'views') {
      order.push(['view_count', 'DESC']);
    } else if (sort === 'latest') {
      order.push(['createdAt', 'DESC']);
    } else if (sort === 'sale') {
      // "sale" 옵션인 경우, 판매중인 게시글만 조회하고 최신순 정렬
      whereClause.sale_status = true;
      order.push(['createdAt', 'DESC']);
    } else {
      // 기본 정렬: 최신순
      order.push(['createdAt', 'DESC']);
    }
    
    const posts = await Post.findAll({ where: whereClause, order });
    const postsWithDetails = await Promise.all(posts.map(async (post) => {
      const likeCount = await PostLike.count({ where: { post_id: post.id } });
      const writer = await User.findByPk(post.writer_id);
      const owner = await User.findByPk(post.owner_id);
      return { 
        ...post.toJSON(),
        writer_name: writer ? writer.user_name : null,
        owner_name: owner ? owner.user_name : null,
        likeCount
      };
    }));
    
    res.json(postsWithDetails);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// 게시글 구매 API: 판매 상태가 true인 게시글을, 판매 시작 API에서 설정한 price 사용하여 구매 처리
exports.purchasePost = async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const { buyer_id } = req.body;
    
    const buyer = await User.findByPk(buyer_id);
    if (!buyer) return res.status(404).json({ message: "Buyer not found" });
    
    const post = await Post.findByPk(post_id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    
    if (!post.sale_status) return res.status(400).json({ message: "Post is not for sale" });
    
    const seller = await User.findByPk(post.owner_id);
    if (!seller) return res.status(404).json({ message: "Seller not found" });
    
    if (buyer_id === seller.id) return res.status(400).json({ message: "Cannot purchase your own post" });
    
    const postPrice = parseFloat(post.price);
    
    if (parseFloat(buyer.user_token_balance) < postPrice) {
      return res.status(400).json({ message: "Insufficient token balance" });
    }
    
    buyer.user_token_balance = parseFloat(buyer.user_token_balance) - postPrice;
    await buyer.save();
    
    seller.user_token_balance = parseFloat(seller.user_token_balance) + postPrice;
    await seller.save();
    
    post.owner_id = buyer_id;
    await post.save();
    
    const transaction_hash = crypto.randomBytes(16).toString("hex");
    const transaction = await Transaction.create({
      seller_id: seller.id,
      buyer_id: buyer.id,
      post_id: post.id,
      amount: postPrice,
      gas_fee: post.gas_fee,
      transaction_type: "sale",
      transaction_hash,
      status: "completed",
      transaction_date: new Date()
    });
    
    res.json({ message: "Post purchased successfully", transaction });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 게시글 좋아요 API: toggle 방식 (한 번 누르면 등록, 다시 누르면 취소)
exports.likePost = async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const { user_id } = req.body;
    
    const post = await Post.findByPk(post_id);
    if (!post) return res.status(400).json({ message: 'Invalid post_id. Post does not exist.' });
    
    const user = await User.findByPk(user_id);
    if (!user) return res.status(400).json({ message: 'Invalid user_id. User does not exist.' });
    
    let like = await PostLike.findOne({ where: { post_id, user_id } });
    if (like) {
      await like.destroy();
      return res.status(200).json({ message: 'Like removed' });
    } else {
      like = await PostLike.create({ post_id, user_id });
      return res.status(201).json({ message: 'Post liked successfully', like });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 특정 사용자의 게시글 조회 API
// writer_id 또는 owner_id가 주어진 user_id인 모든 게시글을 반환하며, writer와 owner의 이름을 포함합니다.
exports.getUserPosts = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const posts = await Post.findAll({
      where: {
        [Op.or]: [
          { writer_id: user_id },
          { owner_id: user_id }
        ]
      }
    });
    const postsWithDetails = await Promise.all(posts.map(async (post) => {
      const writer = await User.findByPk(post.writer_id);
      const owner = await User.findByPk(post.owner_id);
      return { 
        ...post.toJSON(),
        writer_name: writer ? writer.user_name : null,
        owner_name: owner ? owner.user_name : null,
      };
    }));
    res.json(postsWithDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};