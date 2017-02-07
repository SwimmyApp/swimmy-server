const db = require('../../osdi-sequelize')

module.exports = {
  resource: 'events',

  Model: db.Event,

  querify: req => ({}),

  restrict: req => new Promise((resolve, reject) => {
    resolve('')
  }),

  validate: req => ({})
}
