const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("../database");

const CommentModel = sequelize.define("comment", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    commentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    ownerId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
   

});

module.exports = CommentModel;