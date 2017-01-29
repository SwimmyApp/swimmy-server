# osdi-express

A route generator for OSDI endpoints that exposes GET, POST, PUT, and DELETE for
a given OSDI resource, complete with HAL style pagination, embedded results, and
links.

## Usage

### osdi.initialize(config)

`config` should contain all of the following fields

```javascript
osdi.initialize({
  motd: 'my nice message of the day!',
  vendorName: 'vendor name!',
  productName: 'product name!',
  namespace: "osdi-sample",
  maxPageSize: 25,                    // used for pagination length
  baseUrl: "https://osdi-sample.com", // used for constructing URLs in HAL
  resources: [ 'people' ]             // used to construct the app-entry-point
})
```

Calling `osdi.initialize(config)` is required before any of the other methods.

### osdi.aep()

Returns a properly formatted app entry point as a Javascript object. You should
return it on `GET /`.

```javascript
app.get('/', (req, res) => res.json(osdi.aep()))
```

### osdi.generate({resource, Model, querify, restrict, validate})

Returns an express `app` object with the following endpoints:
```
GET /
GET /:id
```

With the complete set coming soon:
```
POST    /
PUT     /:id
DELETE  /:id
```

It should be "used" by the resource endpoint, like so:
```javascript
app.use('/people', osdi.generate({
  resource: 'people',         // should be one of the resources listed in config.resources

  Model: Person,              // a Sequelize model (http://docs.sequelizejs.com/en/v3/)

  querify: (req) => query,    // synchronous function that takes an express request object and
                              // returns a valid sequelize query (http://docs.sequelizejs.com/en/v3/docs/querying/)
                              // is passed directly to Model.findAll, .findOne, etc.
                              // will be called for GET / and GET /:id

  restrict: (req) => Promise, // asynchronous function that returns a Promise
                              // should resolve with either true or a list of attributes
                              // that should be served in the response
                              // if present, attributes will be passed to Model.findAll / .findOne
                              //
                              // should reject with an error that will be returned
                              // to the user with a 403 if the requesting user should
                              // not be allowed to access this endpoint
                              //
                              // Use this function to check request auth headers, etc.
                              //
                              // Will be called for all HTTP verbs - if you want to restrict
                              // GET but not POST, just check `req.method` and respond
                              // accordingly

  validate: (req) => object   // synchronous function that takes an express request object and
                              // performs validation on the request body - called for POST and PUT
                              //
                              // if object.error is null, the database call will proceed
                              // if it exists, a 400 will be served with an OSDI-style error
                              // (http://opensupporter.github.io/osdi-docs/errors.html#error-description)
                              //
                              // if object.query is not null and the method is a POST,
                              // the database will only update if the given resource matches
                              // the query
}))
```

## Examples

Coming soon...
