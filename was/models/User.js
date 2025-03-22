const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  user_name: DataTypes.STRING,
  user_email: DataTypes.STRING,
  user_pw: DataTypes.STRING,
  user_wallet_address: DataTypes.STRING,
  user_token_balance: DataTypes.DECIMAL(20, 4)
}, { timestamps: true });

module.exports = User;
