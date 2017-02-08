const Sequelize = require('sequelize')
const {STRING, ARRAY, DATE, ENUM, BOOLEAN, UUIDV4} = Sequelize
const addCommonFields = require('./helpers/common-fields')

module.exports = sequelize =>
  sequelize.define('attendance', addCommonFields({
    status: ENUM('declined', 'tentative', 'accepted', 'cancelled', 'needs action'),
    attended: BOOLEAN,
    actionDate: DATE,
    comment: STRING,
    person: UUIDV4,
    event: UUIDV4,
  }))
