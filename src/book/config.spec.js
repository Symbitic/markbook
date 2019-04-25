/* eslint-env jest */
import config from './config'
import path from 'path'

describe('config', () => {
  it('should parse correctly', () => {
    expect(
      config({
        filepath: path.join('tests', 'basic', 'markbook.yml'),
        config: {
          title: 'Basic'
        }
      })
    ).resolves.toMatchObject({
      title: 'Basic'
    })
  })
})
