const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgresql://localhost')
const models = require('./models')
const controllers = require('./controllers')

const sql = models(sequelize)
for (let resource in controllers) {
  sql[resource] = controllers[resource](sql)
}

module.exports = sql
