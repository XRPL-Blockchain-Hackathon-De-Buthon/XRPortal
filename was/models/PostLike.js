const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const PostLike = sequelize.define('PostLike', {
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, { timestamps: true });

module.exports = PostLike;
