'use strict'

const DEFAULT = {
  pages: []
}

function getPagination (pagination) {
  pagination = Object.assign(DEFAULT, pagination)
  const {current: rawCurrent, pages: rawPages} = pagination

  const current = rawCurrent && Number(rawCurrent)
  const pages = rawPages.filter(Boolean).map(Number)
  const has = (page) => pages.includes(page)

  return {
    current,
    pages,
    has
  }
}

module.exports = getPagination
