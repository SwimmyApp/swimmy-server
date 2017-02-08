const db = require('../../osdi-sequelize')

module.exports = {
  singular: 'event',
  linkedResources: [],
  Model: db.Event,

  querify: req => ({}),

  restrict: req => new Promise((resolve, reject) => {
    resolve('')
  }),

  validate: req => ({})
}
