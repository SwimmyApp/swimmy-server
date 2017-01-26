module.exports = 
  (resolve, reject) =>
    (err, results) =>
      err
        ? reject(err)
        : resolve(results)
