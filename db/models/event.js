const Sequelize = require('sequelize')
const {STRING, ARRAY, DATE, ENUM, INTEGER, BOOLEAN, DOUBLE} = Sequelize
const {EMAIL, URL} = require('../custom-types')
const addCommonFields = require('../common-fields')

module.exports = sequelize =>
  sequelize.define('event', addCommonFields({
    originSystem: STRING,
    name: STRING,
    title: STRING,
    description: STRING,
    summary: STRING,
    browserUrl: URL,
    status: ENUM('confirmed', 'tentative', 'canceled'),
    instructions: STRING,
    startDate: DATE,
    endDate: DATE,
    allDay: BOOLEAN,
    allDayDate: BOOLEAN,
    capacity: INTEGER,
  
    /*
     * TODO - figure out relations
     */

    /*
     * TODO
     * type
     * ticketLevels
     * total_tickets
     * total_amount
     * guestsCanInviteOthers
     * transparence
     * visibility
     */

    /*
     * Non-OSDI fields
     */
    latitude: DOUBLE,
    longitude: DOUBLE,
    hostType: ENUM('group', 'person'),
  }))
