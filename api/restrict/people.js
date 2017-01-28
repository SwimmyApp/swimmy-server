// const db = require('../../../db')
const login = require('../utils/login')

module.exports = {
  all: (req, res, next) => next(),
  one: (req, res, next) => next()
  // all: (req, res, next) => login.required(res, res, next),
  // one: (req, res, next) => login.required(res, res, () => {
  //   if (req.user.uuid == req.params.id) next()
  //   else
  //     res
  //     .status(403)
  //     .json({
  //       error: 'User not allowed to request this person'
  //     })
  // })
}
