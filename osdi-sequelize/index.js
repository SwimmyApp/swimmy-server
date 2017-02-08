const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgresql://localhost')
const models = require('./models')

const ms = models(sequelize)

const { Attendance, Person, Event } = ms

Attendance.belongsTo(Person)
Attendance.belongsTo(Event)

module.exports = ms
