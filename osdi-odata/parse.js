const camelCase = require('to-camel-case')

const conjunctions = {
  or: (q1, q2) => ({ $or: [q1, q2] }),
  and: (q1, q2) => Object.assign(q1, q2)
}

const operators = {
  eq: val => (val),
  ne: val => ({$ne: val}),
  gt: val => ({$gt: val}),
  ge: val => ({$gte: val}),
  lt: val => ({$lt: val}),
  le: val => ({$lte: val})
}

const sanitize = str => str.replace(`'`, '').replace(`\'`, '')

const attrify = (key, val) => {
  if (key.indexOf('.') > -1) {
    const [topkey, subkey] = key.split('.', 2)
    return {
      [camelCase(topkey)]: {
        [camelCase(subkey)]: val
      }
    }
  }

  return {
    [camelCase(key)]: val
  }
}

const parse = raw => {
  const str = raw.trim()
  
  const orGuess = str.split('or', 2)
  const andGuess = str.split('and', 2)

  if (orGuess.length > 1) {
    return conjunctions.or(parse(orGuess[0]), parse(orGuess[1]))
  }

  if (andGuess.length > 1) {
    return conjunctions.and(parse(andGuess[0]), parse(andGuess[1]))
  }

  const array = str.split(' ')
  if (operators[array[1]]) {
    const val = sanitize(array[2])
    return attrify(array[0], operators[array[1]](val))
  }

  return str
}

module.exports = parse
