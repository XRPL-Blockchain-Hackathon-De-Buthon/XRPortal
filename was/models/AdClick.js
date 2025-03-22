const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const AdClick = sequelize.define('AdClick', {
  ad_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, { timestamps: true });

module.exports = AdClick;
