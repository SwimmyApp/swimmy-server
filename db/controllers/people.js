const config = require('../../config')

module.exports = db => {
  const { Person } = db
  const e = {}

  e.all = (req) => new Promise((resolve, reject) => {
    const where = {} /* add query processing logic from req */
    const options = {
      where,
      limit: config.maxPageSize,
      offset: (req.page - 1) * config.maxPageSize
    }

    Promise
    .all([Person.count(options), Person.findAll(options)])
    .then(([count, docs]) => resolve({count, docs}))
    .catch(reject)
  })

  // e.one = (req) => new Promise((resolve, reject) => {
  //   const where = {uuid: req.params.id} // incorporate more query logic
  //   const options = {where}
  //
  //   Person.findOne(options)
  //   .then()
  // })

  return e
}
