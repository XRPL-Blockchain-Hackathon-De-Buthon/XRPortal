const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Post = sequelize.define('Post', {
  post_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  post_content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  writer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(20,4),
    allowNull: true, // 판매 시작 API에서 설정
  },
  gas_fee: {
    type: DataTypes.DECIMAL(20,4),
    allowNull: false,
    defaultValue: 0.001
  },
  nft_id: {
    type: DataTypes.STRING,  // NFT ID는 문자열로 저장 (숫자형이면 INTEGER로 변경)
    allowNull: true
  },
  view_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  sale_status: {
    type: DataTypes.TINYINT(1),
    defaultValue: 0  // 0: not for sale, 1: for sale (판매 상태 변경 API 등에서 업데이트)
  }
}, { timestamps: true });

module.exports = Post;
