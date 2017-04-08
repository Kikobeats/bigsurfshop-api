'use strict'

const from = require('from2').obj
const got = require('got')

const getPagination = require('./pagination')
const {ENDPOINT} = require('./constants')
const mapper = require('./mapper')

const fetch = (opts) => got.get(ENDPOINT, opts)

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

    let pagination

    const hasPagesToFetch = () => {
      const {page: nextPage} = query
      const hasFetchNextPage = nextPage < pages
      const hasNextPage = nextPage === 1 || pagination.has(nextPage)

      return hasFetchNextPage && hasNextPage
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

          const {items: rawItems, pagination: rawPagination} = body.data
          pagination = getPagination(rawPagination)

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
