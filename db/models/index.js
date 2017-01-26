const fs = require('fs')
const modelFiles = fs
  .readDirSync('./models')
  .filter(file => file.endsWith('.js') && file != 'index.js')

module.exports = sequelize => {
  const models = {}
  modelFiles.forEach(mf => {
    const mn = mf.split('.')[0]
    exports[mn] = require(`./models/${mf}`)(sequelize)
  })
  return {sequelize, models}
}
