# bigsurfshop-api

![Last version](https://img.shields.io/github/tag/Kikobeats/bigsurfshop-api.svg?style=flat-square)
[![Build Status](http://img.shields.io/travis/Kikobeats/bigsurfshop-api/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/bigsurfshop-api)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/bigsurfshop-api.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/bigsurfshop-api)
[![Dependency status](http://img.shields.io/david/Kikobeats/bigsurfshop-api.svg?style=flat-square)](https://david-dm.org/Kikobeats/bigsurfshop-api)
[![Dev Dependencies Status](http://img.shields.io/david/dev/Kikobeats/bigsurfshop-api.svg?style=flat-square)](https://david-dm.org/Kikobeats/bigsurfshop-api#info=devDependencies)
[![NPM Status](http://img.shields.io/npm/dm/bigsurfshop-api.svg?style=flat-square)](https://www.npmjs.org/package/bigsurfshop-api)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/Kikobeats)

> Programatic API access for bigsurfshop.com

## Install

```bash
$ npm install bigsurfshop-api --save
```

## Usage

```js
const bigsurfshop = require('bigsurfshop-api')

const stream = bigsurfshop({
  key: process.env.API_KEY, // API Key credentials
  pages: 3, // Numbers or request per each method call [default=Infinity]
})
```

## License

MIT © [Kiko Beats](http://kikobeats.com)
