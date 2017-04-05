'use strict'

const parsePrice = require('parse-price')

function createNormalizePrice (prop) {
  function normalizePrice (item) {
    const price = item[prop]
    return Math.trunc(parsePrice(price))
  }

  return normalizePrice
}

module.exports = createNormalizePrice
