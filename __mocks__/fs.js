/* global jest */

const fs = jest.genMockFromModule('fs')

const writeFile = (filename, data, callback) => {
  callback(undefined, data)
}

fs.writeFile = writeFile

module.exports = fs
