const Sequelize = require('sequelize')
const sequelize = new Sequelize('database', 'username', 'password')

/*
 * Add model definitions
 */

module.exports = sequelize
