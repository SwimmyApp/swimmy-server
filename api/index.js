const express = require('express')
const app = express()
const https = require('https')

/*
 * TODO define routes
 */

const PORT = process.env.PORT || 3001
const server = https.createServer(app)

server.listen(PORT, err => {
  if (err) {
    log('Could not start server: %j', err)
    process.exit(1)
  }

  log('API listening on %d', PORT)
})
