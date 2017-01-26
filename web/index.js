const express = require('express')
const app = express()
const https = require('https')
const ReactDOMStream = require('react-dom-stream/server')

/*
 * Define routes to SSRed content
 * TODO
 */

const PORT = process.env.PORT || 3000
const server = https.createServer(app)

server.listen(PORT, err => {
  if (err) {
    log('Could not start server: %j', err)
    process.exit(1)
  }

  log('WEB listening on %d', PORT)
})
