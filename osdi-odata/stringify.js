const snakeCase = require('to-snake-case')

const conjunctions = {
  $or: (q1, q2) => ``,
  $and: (q1, q2) => Object.assign(q1, q2)
}

const operators = {
  $eq: 'eq',
  $ne: 'ne',
  $gt: 'gt',
  $gte: 'ge',
  $lt: 'lt',
  $lte: 'le'
}

const deop = obj => {
  if (typeof obj == 'object') {
    const op = Object.keys(obj)[0]
    const val = obj[op]
    if (typeof val == 'string')
      return `${operators[op]} '${val}'`
    return `${operators[op]} ${val}`
  } else {
    if (typeof obj == 'string')
      return `eq '${obj}'`
    return `eq ${obj}`
  }
}

const stringify = obj => {
  const keys = Object.keys(obj)

  if (keys.length == 0) return {}
  if (keys.length == 1) {
    const key = keys[0]
    if (key == '$or') {
      return obj[key].map(cond => stringify(cond)).join(' or ')
    }

    if (key == '$and') {
      return obj[key].map(cond => stringify(cond)).join(' and ')
    }

    const value = obj[key]

    if (typeof value == 'object') {
      const op = Object.keys(value)[0]
      if (operators[op])
        return `${snakeCase(key)} ${deop(value)}`
      return `${snakeCase(key)}.${snakeCase(op)} ${deop(value[op])}`
    }

    return `${snakeCase(key)} eq '${value}'`
  }

  return keys.map(key => stringify({[key]: obj[key]})).join(' and ')
}

module.exports = stringify
