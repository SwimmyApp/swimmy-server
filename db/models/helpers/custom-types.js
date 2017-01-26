module.exports.EMAIL = {
  type: STRING,
  validate: {
    isEmail: true
  }
}

module.exports.URL = {
  type: STRING,
  validate: {
    isUrl: true
  }
}
