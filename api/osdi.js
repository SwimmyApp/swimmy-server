const express = require('express')
const debug = require('debug')
const db = require('../db')
const restrict = require('./restrict')
const halify = require('./utils/halify')
const handleError = require('./utils/handle-error')
const paginate = require('./utils/paginate')

module.exports = r => {
  const log = debug(`swimmy:${r}`)
  const app = express()

  log('Initializing...')

  app.get('/', restrict[r].all, paginate, (req, res) => {
    db[r].all(req)
    .then(result => res.json(halify.collection(r, req, result)))
    .catch(handleError(res))
  })

  app.get('/:id', restrict[r].one, (req, res) => {
    db[r].one(req)
    .then(result => res.json(halify.resource(r, req, result)))
    .catch(handleError(res))
  })

  //
  // app.get('/:id/:link', restrict[r].link, (req, res) => {
  //   db[r].link(req)
  //   .then(result => res.json(halify.resource(r, req, result)))
  // })
  //
  // app.post('/', restrict[r].post, validate[r].post, (req, res) => {
  // })
  //
  // app.put('/:id', restrict[r].put, validate[r].put, (req, res) => {
  // })
  //
  // app.delete('/:id', restrict[r].delete, (res, res) => {
  // })
  //
  return app
}
