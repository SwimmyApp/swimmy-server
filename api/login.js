const log = require('debug')('swimmy:login')
const jwt = require('jwt-simple')
const db = require('../osdi-sequelize')

const secret = process.env.SECRET || '12345'

const e = {}

e.middleware = (req, res, next) => {
  const token = req.headers['OSDI-ACCESS-TOKEN']
  if (!token) {
    log('No \'OSDI-ACCESS-TOKEN\' token present')
    return next()
  }

  const {iss, exp} = jwt.decode(token, secret)

  if (!iss || !exp) {
    log('Token is invalid')
    return next()
  }

  db.Person
  .findById(iss)
  .then(user => {
    log('User %s found', iss)
    req.user = user
    next()
  })
  .catch(err => {
    log('User not found, error: %j', err)
    next()
  })
}

const express = require('express')
const app = express()

/*
app.post('/login', e.middleware, (req, res) => {
  if (req.user)
    return res.json({token: req.headers['OSDI-ACCESS-TOKEN']})

  const {email, password} = req.body
  db.Person
  .findOne({
})*/

e.app = app

module.exports = e

