const fs = require('fs')
const files = 'people'.split(' ')

const e = {}
files.forEach(f => {
  e[f] = require(`./${f}`)
})

module.exports = e
