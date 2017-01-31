const request = require('superagent')
const expect = require('chai').expect
const config = require('../../config')
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

let onePersonLink
describe('GET /people', () => {
  let nextLink

  it('should return valid hal', done => {
    request
      .get(config.baseUrl + '/people?param=dummy')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an.object
        expect(res.body).to.have.deep.property('_links.next')
        nextLink = res.body._links.next.href
        expect(res.body).to.have.deep.property('_links.osdi:people')
        onePersonLink = res.body._links['osdi:people'][0].href
        expect(res.body).to.have.deep.property('_embedded.osdi:people')
        done()
      })
  })


  it('should paginate', done => {
    request
      .get(nextLink)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an.object
        expect(res.body).to.have.deep.property('_links.next')
        expect(res.body).to.have.deep.property('_links.prev')
        expect(res.body).to.have.deep.property('_links.osdi:people')
        expect(res.body).to.have.deep.property('_embedded.osdi:people')
        done()
      })
  })
})

describe('GET /people/:id', () => {
  it('should return valid hal', done => {
    request
      .get(onePersonLink)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an.object
        done()
      })
  })
})

let newPersonId
describe('POST /people', () => {
  it('should return the posted person', done => {
    request
      .post(config.baseUrl + '/people')
      .send(require('./person'))
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an.object
        newPersonId = res.body.uuid
        done()
      })
  })

  it('person should now be getable', done => {
    request
      .get(config.baseUrl + '/people/' + newPersonId)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an.object
        done()
      })
  })

  // TODO -- add validation for person and cause the api call to fail
})

describe('PUT /people/:id', () => {
  it('should overwrite the property', done => {
    request
      .put(config.baseUrl + '/people/' + newPersonId)
      .send({givenName: 'johnny'})
      .end((err, res) => {
        expect(res.status).to.equal(200)
        console.log(res.body)
        expect(res.body.givenName).to.equal('johnny')
        done()
      })
  })

  // TODO -- add validation for person and cause the api call to fail
})
