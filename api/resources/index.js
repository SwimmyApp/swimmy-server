const e = {}

'people events'
.split(' ')
.forEach(rn =>
  e[rn] = require(`./${rn}.js`)
)

module.exports = e
