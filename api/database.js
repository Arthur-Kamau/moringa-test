const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('postgres://kenn:kenn@localhost:5432/moringa') // Example for postgres ie username:password@localhost:5432/db_name



module.exports = sequelize;