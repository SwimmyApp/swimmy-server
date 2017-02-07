const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const http = require('http')
const log = require('debug')('swimmy:api')
const osdi = require('../osdi-express')
const config = require('./config')
const login = require('./login')

/*
 * Set up global middlewares
 */
app.use(morgan('combined'))
app.use(bodyParser.json())

osdi.initialize(config)

app.get('/', (req, res) => {
  res.json(osdi.aep())
})

//app.use(login.app)
//app.use(login.middleware)

const apps = osdi.generate(config.resources)
for (let r in apps) {
  app.use('/' + r, apps[r])
}

app.use((req, res) => {
  /* TODO: Process 404 */
  log('404!')
  res.status(404).send('404')
})

const PORT = process.env.PORT || 3001
const server = http.createServer(app)

server.listen(PORT)
log('API listening on %d', PORT)
