/* global jest */

const fs = jest.requireActual('fs')

let contents = {}

const writeFile = (filename, data, callback) => {
  contents[filename] = /\ufffd/.test(data.toString()) ? data : data.toString()
  callback(undefined, data)
}

const filesystem = () => contents

const clear = () => {
  contents = {}
}

module.exports = {
  ...fs,
  writeFile,
  filesystem,
  clear
}
