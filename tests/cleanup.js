const path = require('path')
const globby = require('globby')
const rimraf = require('rimraf')
const util = require('util')

const rm = util.promisify(rimraf)

module.exports = () =>
  globby(['tests/fixtures/**/book/*.html'])
    .then(files =>
      files
        .map(file => file.replace(/tests\/fixtures\/([^/]+)\/.+$/, '$1'))
        .filter((dir, i, dirs) => dirs.indexOf(dir) >= i)
        .map(dir => path.join('tests', 'fixtures', dir, 'book'))
    )
    .then(dirs =>
      Promise.all(dirs.map(dir => rm(dir).catch(err => console.error(err))))
    )
