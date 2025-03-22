const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const CommentLike = sequelize.define('CommentLike', {
  comment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, { timestamps: true });

module.exports = CommentLike;
