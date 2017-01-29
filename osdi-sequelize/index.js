const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgresql://localhost')
const models = require('./models')

module.exports = models(sequelize)
