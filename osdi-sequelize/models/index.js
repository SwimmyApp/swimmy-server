const files = 'event person attendance'.split(' ')

module.exports = sequelize => {
  const models = {}
  files.forEach(m => {
    exports[
      m.charAt(0).toUpperCase() + m.slice(1)
    ] = require(`./${m}`)(sequelize)
  })
  exports.sql = sequelize
  return exports
}
