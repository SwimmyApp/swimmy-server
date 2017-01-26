const log = require('debug')('swimmy:redis')
let client

try {
  client = require('redis').createClient(process.env.REDIS_URL)
} catch (e) {
  log('Could not connect to redis – make sure it\'s running then restart')
  throw e
}

module.exports = client
