const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Ad = sequelize.define('Ad', {
  ad_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // 광고 내용은 S3 업로드 후 반환된 이미지 URL을 저장합니다.
  ad_content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATEONLY,  // YYYY-MM-DD 형식
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATEONLY,  // YYYY-MM-DD 형식
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ad_price: {
    type: DataTypes.DECIMAL(20, 4),
    allowNull: false,
  },
  click_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
}, { timestamps: true });

module.exports = Ad;
