const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Comment = sequelize.define('Comment', {
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment_content: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, { timestamps: true });

module.exports = Comment;
