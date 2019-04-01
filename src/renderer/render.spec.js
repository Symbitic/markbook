/* global expect, jest */
import fs from 'fs'
import util from 'util'

jest.mock('fs')

const writeFile = util.promisify(fs.writeFile)

describe('renderer/render', () => {
  it('should work with a promise', () => {
    expect(
      writeFile(
        '/home/ec2-user/environment/node/markbook/data.txt',
        'Hello, World!'
      )
    ).resolves.toBe('Hello, World!')
  })
})
