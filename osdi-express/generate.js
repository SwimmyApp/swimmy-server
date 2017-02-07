const express = require('express')
const debug = require('debug')
const handleError = require('./utils/handle-error')
const paginate = require('./utils/paginate')
const binder = require('./utils/binder')
const controller = require('./controller')
const halify = require('./utils/halify')

module.exports = (resource, config) => {
  const {
    Model, linkedResources, querify, restrict, validate
  } = config.resources[resource]

  if (!config)
    throw new Error('Must initialize osdi express with a config object before generating routes')

  const log = debug(`swimmy:${config.namespace}`)
  const app = express()

  log('Initializing...')

  const db = controller({Model, querify, config, validate})

  app.get('/', binder(restrict, 'attributes'), paginate, (req, res) => {
    log('GET /')

    db.all(req)
    .then(result => res.json(halify.collection(resource, req, result)))
    .catch(handleError(res))
  })

  app.get('/:id', binder(restrict, 'attributes'), (req, res) => {
    log('GET /%s', req.params.id)

    db.one(req)
    .then(result => res.json(halify.object(resource, req, result.dataValues)))
    .catch(handleError(res))
  })

  /*app.get('/:id/:link', restrict[r].link, (req, res) => {
    db[r].link(req)
    .then(result => res.json(halify.resource(r, req, result)))
  })*/

  app.post('/', binder(restrict, 'attributes'),  (req, res) => {
    log('POST /')

    db.create(req)
    .then(result => res.json(halify.object(resource, req, result.dataValues)))
    .catch(handleError(res))
  })

  app.put('/:id', binder(restrict, 'attributes'), (req, res) => {
    log('PUT /%s', req.params.id)

    db.edit(req)
    .then(result => res.json(halify.object(resource, req, result.dataValues)))
    .catch(handleError(res))
  })

  app.delete('/:id', restrict, (req, res) => {
    log('DELETE /%s', req.params.id)

    db.remove(req)
    .then(numDeleted => res.json({notice: `${numDeleted} rows were deleted`}))
    .catch(handleError(res))
  })

  return app
}
