const parse = require('./parse')
const expect = require('chai').expect

const tests = {
  [`first_name eq 'John'`]: {
    firstName: 'John'
  },
  [`first_name ne 'John'`]: {
    firstName: {
      $ne: 'John'
    }
  },
  [`birthdate.month gt 1980`]: {
    birthdate: {
      month: {
        $gt: '1980'
      }
    }
  },
  [`first_name eq 'John' or first_name eq 'Jon'`]: {
    $or: [
      {firstName: 'John'},
      {firstName: 'Jon'}
    ]
  },
  [`first_name eq 'John' and last_name eq 'Doe'`]: {
    firstName: 'John',
    lastName: 'Doe'
  }
}

describe('parsing', () => {
  for (let test in tests) {
    it(test, () => {
      expect(parse(test)).to.deep.equal(tests[test])
    })
  }
})
