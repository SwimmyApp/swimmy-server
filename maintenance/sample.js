module.exports = {
  people: n => new Array(n).fill(null).map((_, n) => ({
    familyName: `John Doe ${n}`
  })),
  events: n => new Array(n).fill(null).map((_, n) => ({
    name: `John Doe ${n}`
  }))
}
