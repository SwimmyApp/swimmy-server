const Sql = require('sequelize')
const db = require('../db')
const { Person, Event } = db
const sample = require('./sample')

const where = {}

db.sql
.sync()
.then(Promise.all([Person.destroy({where}), Event.destroy({where})]))
.then(Promise.all(sample.people(100).map(p => Person.create(p))))
.then(Promise.all(sample.events(100).map(p => Event.create(p))))
.then(_ => {
  console.log(_)
  process.exit()
})
.catch(err => {
  console.log(err)
  process.exit(1)
})
