const client = require('../redis')
const { hash } = require('../utils')

module.exports = {
  cache: (url, html) =>
    client.setAsync(hash(url), html)
  ,

  fetch: (url, html) =>
    client.getAsync(hash(url), html)
}
