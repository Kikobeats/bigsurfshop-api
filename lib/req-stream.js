'use strict'

const from = require('from2').obj
const got = require('got')

const CONST = require('./constants')
const mapper = require('./mapper')

const fetch = (opts) => got.get(CONST.ENDPOINT, opts)

const DEFAULT = {
  pages: Infinity
}

function createStream (opts) {
  const {
    key: wrapAPIKey,
    pages = DEFAULT.pages
  } = opts

  function reqStream (query) {
    Object.assign(query, {wrapAPIKey, page: 1})
    const fetchOpts = {json: true, query}
    let first = true
    let itemsPerPage
    let lastPageSize

    const hasPagesToFetch = () => {
      const {page: currentPage} = query
      return (currentPage - 1 < pages) && (lastPageSize === itemsPerPage)
    }

    const stream = from(function (size, next) {
      if (!hasPagesToFetch()) return next(null, null)
      fetch(fetchOpts)
        .then(res => {
          const {body} = res

          if (!body.success) {
            // this case control when you want to fetch the follow
            // page but it doesn't exist. You need to close the
            // stream gracefully if previous pages was fetched.
            const err = query.page > 1 ? null : body.messages
            return next(err, null)
          }

          const {items: rawItems} = body.data

          if (first) {
            first = false
            itemsPerPage = rawItems.length
          }

          lastPageSize = rawItems.length

          // Page is fetched without items
          if (!lastPageSize) return

          ++query.page
          const items = mapper(rawItems)
          const lastItem = items.pop()

          items.forEach(item => this.push(item))
          return next(null, lastItem)
        })
        .catch(next)
    })

    return stream
  }

  return reqStream
}

module.exports = createStream
