const {STRING, ARRAY, DATE, UUID} = Sequelize

module.exports = {
  uuid: {
    type: UUID,
    primaryKey: true
  },
  identifiers: ARRAY(STRING),
  createdDate: DATE,
  modifiedDate: DATE
}
