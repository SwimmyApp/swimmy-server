const request = require('superagent')
const expect = require('chai').expect
const config = require('../../config')
const aepify = require('../utils/aepify')

describe('AEP', () => {
  it('/ should fetch aep', done => {
    request
      .get(config.baseUrl)
      .end((err, res) => {
        expect(res.body).to.deep.equal(aepify(config))
        done()
      })
  })
})

describe('/people', () => {
  let nextLink

  it('should return valid hal', done => {
    request
      .get(config.baseUrl + '/people?param=dummy')
      .end((err, res) => {
        expect(res.body).to.be.an.object
        expect(res.body).to.have.deep.property('_links.next')
        nextLink = res.body._links.next
        expect(res.body).to.have.deep.property('_links.osdi:people')
        expect(res.body).to.have.deep.property('_embedded.osdi:people')
        done()
      })
  })


  it('should paginate', done => {
    request
      .get(nextLink.href)
      .end((err, res) => {
        expect(res.body).to.be.an.object
        expect(res.body).to.have.deep.property('_links.next')
        expect(res.body).to.have.deep.property('_links.prev')
        expect(res.body).to.have.deep.property('_links.osdi:people')
        expect(res.body).to.have.deep.property('_embedded.osdi:people')
        done()
      })
  })
})
