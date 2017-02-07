const db = require('../../osdi-sequelize')

module.exports = {
  Model: db.Person,

  querify: req => ({}),

  restrict: req => new Promise((resolve, reject) => {
    resolve('')
  }),

  validate: req => ({})
}
