const db = require('../../osdi-sequelize')

module.exports = {
  singular: 'event',
  linkedResources: ['attendances'],
  Model: db.Event,

  querify: req => ({}),

  restrict: req => new Promise((resolve, reject) => {
    resolve('')
  }),

  validate: req => ({})
}
