'use strict'

const should = require('should')
const {getItem, getItems} = require('../lib/mapper')

function getFixtures () {
  return [{
    'link': 'http://www.bigsurfshop.com/product/2016-severne-swat/',
    'name': '2016 Severne Swat 4.7m – Great for intermediate+',
    'oldPrice': null,
    'offerPrice': null,
    'price': '€465.00',
    'image': 'http://www.bigsurfshop.com/wp-content/uploads/2017/02/bigsurfshop-Severne-Swat-4.7m-01-247x300.jpg'
  },
  {
    'link': 'http://www.bigsurfshop.com/product/2016-severne-blade-sail/',
    'name': '2016 Severne Blade Sail 5.3m – Great for intermediate+',
    'price': null,
    'oldPrice': '€495.00',
    'offerPrice': '€465.00',
    'image': 'http://www.bigsurfshop.com/wp-content/uploads/2017/02/bigsurfshop-2016-Severne-Blade-5.3m-01-247x300.jpg'
  }]
}

describe('bigsurfshop-api » mapper', function () {
  describe('.getItem', function () {
    it('items without offer price', function () {
      const fixture = getFixtures()[0]
      const item = getItem(fixture)

      should(item).be.eql({
        link: 'http://www.bigsurfshop.com/product/2016-severne-swat/',
        title: '2016 Severne Swat 4.7m €465',
        name: '2016 Severne Swat 4.7m',
        price: 465,
        image: 'http://www.bigsurfshop.com/wp-content/uploads/2017/02/bigsurfshop-Severne-Swat-4.7m-01-247x300.jpg'
      })
    })

    it('items with offer price', function () {
      const fixture = getFixtures()[1]
      const item = getItem(fixture)

      should(item).be.eql({
        link: 'http://www.bigsurfshop.com/product/2016-severne-blade-sail/',
        title: '2016 Severne Blade Sail 5.3m €465',
        name: '2016 Severne Blade Sail 5.3m',
        price: 465,
        image: 'http://www.bigsurfshop.com/wp-content/uploads/2017/02/bigsurfshop-2016-Severne-Blade-5.3m-01-247x300.jpg'
      })
    })
  })

  describe('.getItems', function () {
    it('link, title, name, price and image are present', function () {
      const fixtures = getFixtures()
      const items = getItems(fixtures)

      should(items).be.eql([{
        'link': 'http://www.bigsurfshop.com/product/2016-severne-swat/',
        'name': '2016 Severne Swat 4.7m',
        'title': '2016 Severne Swat 4.7m €465',
        'price': 465,
        'image': 'http://www.bigsurfshop.com/wp-content/uploads/2017/02/bigsurfshop-Severne-Swat-4.7m-01-247x300.jpg'
      },
      {
        'link': 'http://www.bigsurfshop.com/product/2016-severne-blade-sail/',
        'name': '2016 Severne Blade Sail 5.3m',
        'title': '2016 Severne Blade Sail 5.3m €465',
        'price': 465,
        'image': 'http://www.bigsurfshop.com/wp-content/uploads/2017/02/bigsurfshop-2016-Severne-Blade-5.3m-01-247x300.jpg'
      }])
    })
  })
})
