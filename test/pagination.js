'use strict'

const should = require('should')

const getPagination = require('../lib/pagination')

const fixture = {
  'current': '1',
  'pages': [
    '1',
    '2',
    ''
  ]
}

describe('bigsurfshop-api » pagination', function () {
  it('no pagination present', function () {
    const pagination = getPagination()

    should(pagination.current).be.undefined()
    should(pagination.pages).be.eql([])
    should(pagination.has).be.a.Function()
  })

  it('determinate current and pages availables', function () {
    const pagination = getPagination(fixture)

    should(pagination.current).be.equal(1)
    should(pagination.pages).be.eql([1, 2])

    const nextPage = 2
    should(pagination.has(nextPage)).be.true()
  })
})
