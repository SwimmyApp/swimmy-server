const request = require('superagent')
const expect = require('chai').expect
const config = require('../config')
const aepify = require('../../osdi-express/utils/aepify')

describe('GET /', () => {
  it('should fetch aep', done => {
    request
      .get(config.baseUrl)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body).to.deep.equal(aepify(config))
        done()
      })
  })
})

require('./people')
require('./attendances')
