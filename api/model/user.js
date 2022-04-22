const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("../database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: false
  },
 
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true
  },
 
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
 


});

module.exports = User;



