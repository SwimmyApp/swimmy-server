const express = require('express')
const morgan = require('morgan')
const app = express()
const http = require('http')
const osdi = require('../osdi-express')
const config = require('../config')
const log = require('debug')('swimmy:api')
const db = require('../osdi-sequelize')

/*
 * Set up global middlewares
 */
app.use(morgan('combined'))

osdi.initialize(config)

app.get('/', (req, res) => {
  res.json(osdi.aep())
})

const singulars = {
  events: 'Event',
  people: 'Person'
}

config.resources.forEach(r => {
  app.use('/' + r, osdi.generate({
    resource: r,
    Model: db[singulars[r]],
    querify: () => ({}),
    restrict: () => Promise.resolve(''),
    validate: () => ''
  }))
})

app.use((req, res) => {
  /* TODO: Process 404 */
  log('404!')
})

const PORT = process.env.PORT || 3001
const server = http.createServer(app)

server.listen(PORT)
log('API listening on %d', PORT)
