/* global expect, fixtures */
import config from './config'

describe('config', () => {
  it('should parse correctly', () => {
    expect(
      config({
        filepath: fixtures('basic', 'markbook.yml'),
        config: {
          title: 'Basic'
        }
      })
    ).resolves.toMatchObject({
      title: 'Basic'
    })
  })
})
