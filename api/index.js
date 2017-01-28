const express = require('express')
const morgan = require('morgan')
const app = express()
const http = require('http')
const aepify = require('./utils/aepify')
const osdi = require('./osdi')
const config = require('../config')
const log = require('debug')('swimmy:api')

/*
 * Set up global middlewares
 */
app.use(morgan('combined'))

/*
 * TODO define routes
 */

app.get('/', (req, res) => {
  res.json(aepify(config))
})

config.resources.forEach(r =>
  app.use('/' + r, osdi(r))
)

app.use((req, res) => {
  /* TODO: Process 404 */
  log('404!')
})

const PORT = process.env.PORT || 3001
const server = http.createServer(app)

server.listen(PORT)
log('API listening on %d', PORT)
