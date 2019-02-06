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

  // toThrowError(/yuck/);
  /*
  it('', () => {

  })
  it('', () => {

  })
  it('', () => {

  })
  it('', () => {

  })
  it('', () => {

  })

  it('should parse basic correctly', () => {
    expect.assertions(1)
    const fixture = fixtures('basic')
    const yaml = fixtures('basic', 'markbook.yml')
    return expect(load(fixture)).resolves.toMatchObject({
      title: 'Basic',
      version: '0.1.0',
      description: 'A basic example of markbook',
      authors: [ 'Thomas Jefferson', 'James Madison' ],
      config: yaml,
      root: fixture
    })
  })

  it('should return an error when config is empty', () => {
    expect.assertions(1)
    const fixture = fixtures('empty')

    return expect(load(fixture)).rejects.toMatchObject({
      message: expect.stringMatching(/^Config file not found or empty$/)
    })
  })

  it('requires version to be semver-compatible', () => {
    expect.assertions(1)
    const fixture = fixtures('bad-version')

    return expect(load(fixture)).rejects.toMatchObject({
      message: expect.stringMatching(/^invalid "version"$/)
    })
  })

  it('requires a title', () => {
    expect.assertions(1)
    const fixture = fixtures('missing-title')

    return expect(load(fixture)).rejects.toMatchObject({
      message: expect.stringMatching(/^missing "title"$/)
    })
  })

  it('requires authors', () => {
    expect.assertions(1)
    const fixture = fixtures('missing-authors')

    return expect(load(fixture)).rejects.toMatchObject({
      message: expect.stringMatching(/^missing "authors"$/)
    })
  })
  */
})
