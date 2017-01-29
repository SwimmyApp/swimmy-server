const Sequelize = require('sequelize')
const {STRING, ARRAY, DATE, UUID} = Sequelize
const uuidV1 = require('uuid/v1');

module.exports = obj => Object.assign({
  uuid: {
    type: UUID,
    primaryKey: true,
    defaultValue: Sequelize.DataTypes.UUIDV4
  },
  identifiers: ARRAY(STRING),
  createdDate: DATE,
  modifiedDate: DATE
}, obj)
