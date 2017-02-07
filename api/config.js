const db = require('../osdi-sequelize')

const {
  Person
} = db

module.exports = {
  motd: 'Welcome to Project Swimmy!',
  vendorName: 'Progressive Coders Network',
  productName: 'Project Swimmy',
  namespace: "swimmy",
  maxPageSize: 25,
  baseUrl: process.env.BASE_URL || 'localhost:3001',
  resources: require('./resources')
}
