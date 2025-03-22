const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Transaction = sequelize.define('Transaction', {
  seller_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  buyer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(20, 4),
    allowNull: false,
  },
  gas_fee: {
    type: DataTypes.DECIMAL(20, 4),
    defaultValue: 0.001,
  },
  transaction_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transaction_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "completed",
  },
  transaction_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, { timestamps: false });

module.exports = Transaction;
