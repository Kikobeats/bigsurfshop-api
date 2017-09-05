'use strict'

const reduce = require('lodash.reduce')

const createNormalizePrice = require('./create-normalize-price')
const {CLEAN_NAME_REGEX} = require('../constants')

const transform = {
  image: ({image}) => image.includes('http:') ? image : `http:${image}`,
  price: createNormalizePrice('price'),
  offerPrice: createNormalizePrice('offerPrice'),
  oldPrice: createNormalizePrice('oldPrice'),
  name: (item) => {
    const {name} = item
    return name.replace(CLEAN_NAME_REGEX, '')
  }
}

function normalize (item) {
  const normalizedItem = reduce(transform, function (acc, value, key) {
    const fn = transform[key]
    if (item[key]) acc[key] = fn(item)
    return acc
  }, {})
  return Object.assign({}, item, normalizedItem)
}

module.exports = normalize
