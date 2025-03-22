const Comment = require('../models/Comment');
const CommentLike = require('../models/CommentLike');
const Post = require('../models/Post');
const User = require('../models/User');

exports.createComment = async (req, res) => {
  try {
    const { post_id, user_id, comment_content } = req.body;
    const post = await Post.findByPk(post_id);
    if (!post) return res.status(400).json({ message: 'Invalid post_id. Post does not exist.' });
    const user = await User.findByPk(user_id);
    if (!user) return res.status(400).json({ message: 'Invalid user_id. User does not exist.' });
    const comment = await Comment.create({ post_id, user_id, comment_content });
    res.status(201).json({ message: 'Comment created successfully', comment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.likeComment = async (req, res) => {
  try {
    const comment_id = req.params.comment_id;
    const { user_id } = req.body;
    const comment = await Comment.findByPk(comment_id);
    if (!comment) return res.status(400).json({ message: 'Invalid comment_id. Comment does not exist.' });
    const user = await User.findByPk(user_id);
    if (!user) return res.status(400).json({ message: 'Invalid user_id. User does not exist.' });
    let like = await CommentLike.findOne({ where: { comment_id, user_id } });
    if (like) {
      await like.destroy();
      return res.status(200).json({ message: 'Comment like removed' });
    } else {
      like = await CommentLike.create({ comment_id, user_id });
      return res.status(201).json({ message: 'Comment liked successfully', like });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.readComments = async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const post = await Post.findByPk(post_id);
    if (!post) return res.status(400).json({ message: 'Invalid post_id. Post does not exist.' });
    const comments = await Comment.findAll({ where: { post_id } });
    const commentsWithLikes = await Promise.all(comments.map(async (comment) => {
      const likeCount = await CommentLike.count({ where: { comment_id: comment.id } });
      return { ...comment.toJSON(), likeCount };
    }));
    res.json(commentsWithLikes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
