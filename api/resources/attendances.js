const db = require('../../osdi-sequelize')

module.exports = {
  singular: 'attendance',
  Model: db.Attendance,
  linkedResources: [],

  querify: req => ({}),

  restrict: req => new Promise((resolve, reject) => {
    resolve('')
  }),

  validate: req => ({})
}
