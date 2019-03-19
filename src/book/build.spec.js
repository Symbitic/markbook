/* global expect, fixtures */
import build from './build'

describe('build', () => {
  it('should build correctly', () => {
    const basic = fixtures('basic')
    expect(build(basic)).resolves.toBeDefined()
  })
})
