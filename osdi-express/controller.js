module.exports = ({Model, querify, config}) => {
  const e = {}

  e.all = (req) => new Promise((resolve, reject) => {
    const where = querify(req)

    const options = {
      where,
      limit: config.maxPageSize,
      offset: (req.page - 1) * config.maxPageSize
    }

    Promise
    .all([Model.count(options), Model.findAll(options)])
    .then(([count, docs]) => resolve({count, docs}))
    .catch(reject)
  })

  e.one = (req) => new Promise((resolve, reject) => {
    const where = Object.assign({uuid: req.params.id}, querify(req))
    const options = {where}

    Model
    .findOne(options)
    .then(doc => resolve(doc))
    .catch(reject)
  })

  return e
}
