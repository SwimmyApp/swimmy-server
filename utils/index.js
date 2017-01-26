module.exports =
  'hash'
  .reduce((acc, key) =>
    Object.assign({[key]: require(key)})
  , {})
