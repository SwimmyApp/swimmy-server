const express = require('express')
const debug = require('debug')
const handleError = require('./utils/handle-error')
const paginate = require('./utils/paginate')
const aepify = require('./utils/aepify')
const binder = require('./utils/binder')
const controller = require('./controller')
const halify = require('./utils/halify')

const e = {}

let config
e.initialize = (options) => {
  config = options
  halify.initialize(options)
}

e.generate = ({resource, Model, querify, restrict, validate}) => {
  if (!config)
    throw new Error('Must initialize osdi express with a config object before generating routes')

  const log = debug(`swimmy:${config.namespace}`)
  const app = express()

  log('Initializing...')

  const db = controller({Model, querify, config})

  app.get('/', binder(restrict, 'attributes'), paginate, (req, res) => {
    db.all(req)
    .then(result => res.json(halify.collection(resource, req, result)))
    .catch(handleError(res))
  })

  app.get('/:id', binder(restrict, 'attributes'), (req, res) => {
    db.one(req)
    .then(result => res.json(halify.object(resource, req, result.dataValues)))
    .catch(handleError(res))
  })

  // app.get('/:id/:link', restrict[r].link, (req, res) => {
  //   db[r].link(req)
  //   .then(result => res.json(halify.resource(r, req, result)))
  // })

  // app.post('/', restrict[r].post, validate[r].post, (req, res) => {
  // })

  // app.put('/:id', restrict[r].put, validate[r].put, (req, res) => {
  // })

  // app.delete('/:id', restrict[r].delete, (res, res) => {
  // })

  return app
}

e.aep = () => {
  if (!config)
    throw new Error('Must initialize osdi express with a config object before generating routes')
  return aepify(config)
}

module.exports = e
