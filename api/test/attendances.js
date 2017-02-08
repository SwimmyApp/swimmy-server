const expect = require('chai').expect
const request = require('superagent')
const config = require('../config')

global.eventId

describe('GET /people/:id/attendances', () => {
  it('should return a proper HAL collection', done => {
    request
      .get(config.baseUrl + '/people/' + newPersonId + '/attendances')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an.object
        done()
      })
  })
})

describe('POST /attendances (RSVP)', () => {

  it('should be able to fetch an event', done => {
    request
      .get(config.baseUrl + '/events')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an.object
        eventId = res.body._embedded['osdi:events'][0].uuid
        done()
      })
  })

  it('should be able to post an attendance', done => {
    request
      .post(config.baseUrl + '/attendances')
      .send({
        personUuid: newPersonId,
        eventUuid: eventId
      })
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an.object
        done()
      })
  })
})

describe('GET /people/:id/attendances', () => {
  it('should have some attendances now', done => {
    request
      .get(config.baseUrl + '/people/' + newPersonId + '/attendances')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an.object
        expect(res.body.total_records).to.be.above(0)
        done()
      })
  })
})
