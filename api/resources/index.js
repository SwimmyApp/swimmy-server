const e = {}

'people events attendances'
.split(' ')
.forEach(rn => e[rn] = require(`./${rn}.js`))

module.exports = e
