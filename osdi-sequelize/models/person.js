const Sequelize = require('sequelize')
const {STRING, ARRAY, DATE, ENUM} = Sequelize
const {EMAIL} = require('./helpers/custom-types')
const addCommonFields = require('./helpers/common-fields')

module.exports = sequelize =>
  sequelize.define('person', addCommonFields({
    familyName: STRING,
    givenName: STRING,
    additionalName: STRING,
    honorificPrefix: STRING,
    honorificSuffix: STRING,
    gender: ENUM('male', 'female', 'other'),
    genderIdentity: STRING,
    partyIdentification: STRING,
    source: STRING,
    ethnicities: ARRAY(STRING),
    languagesSpoken: ARRAY(STRING),
    birthdate: DATE,

    /*
     * TODO - figure out relations
     */

    /*
     * TODO <- OSDI
     * employer
     * employerAddress
     * postalAddresses
     * emailAddresses
     * phoneNumbers
     * profiles
     * customFields
     */

    /*
     * Non-OSDI fields, not exposed
     */
    salt: STRING,
    hash: STRING
  }))
