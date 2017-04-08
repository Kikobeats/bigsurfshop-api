'use strict'

const reduce = require('lodash.reduce')
const normalize = require('./normalize')

function getItem (item, size) {
  const normalizedItem = normalize(item)
  const {name, price: rawPrice, offerPrice, link, image} = normalizedItem
  const price = offerPrice || rawPrice
  const title = `${name} €${price}`

  return {
    title,
    name,
    price,
    link,
    image
  }
}

function getItems (collection) {
  const items = reduce(collection, (acc, item) => {
    acc.push(getItem(item))
    return acc
  }, [])

  return items
}

module.exports = getItems
module.exports.getItems = getItems
module.exports.getItem = getItem
