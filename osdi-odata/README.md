# osdi-odata

A small module to convert `sequelize` style queries to odata and vice versa, supporting
the subset of odata features described here: http://opensupporter.github.io/osdi-docs/#filtering-collections.

## Parsing

```javascript
const parse = require('osdi-odata/parse')
const queryString = req.params.filter
// gender eq 'Male' and address.postal_code eq '10011'

const query = parse(queryString)

Person
.find({where: query})
...
```

## Generating
```javascript
const stringify = require('osdi-odata/stringify')
const query = {
  gender: 'Male',
  address: {
    postalCode: '10011'
  }
}

console.log(stringify(query))
// gender eq 'Male' and address.postal_code eq '10011'
```
