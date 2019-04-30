/* eslint-env jest */

const fs = jest.requireActual('fs')

let contents = {}

const writeFile = (filename, data, callback) => {
  const name = filename.replace(process.cwd(), '')
  contents[name] = /\ufffd/.test(data.toString()) ? data : data.toString()
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
