/* eslint-env jest */
import load from './load'
import path from 'path'

describe('load', () => {
  it('should parse basic correctly', () => {
    expect.assertions(1)
    const fixture = path.join('tests', 'basic')
    const yaml = path.join(fixture, 'markbook.yml')
    return expect(load(fixture)).resolves.toMatchObject({
      title: 'Basic',
      version: '0.1.0',
      description: 'A basic example of markbook',
      authors: ['Thomas Jefferson', 'James Madison'],
      config: yaml,
      root: fixture
    })
  })

  it('should return an error when config is empty', () => {
    expect.assertions(1)
    const fixture = path.join('tests', 'empty')

    return expect(load(fixture)).rejects.toMatchObject({
      message: expect.stringMatching(/^Config file not found or empty$/)
    })
  })

  it('requires version to be semver-compatible', () => {
    expect.assertions(1)
    const fixture = path.join('tests', 'bad-version')

    return expect(load(fixture)).rejects.toMatchObject({
      message: expect.stringMatching(/^invalid "version"$/)
    })
  })

  it('requires a title', () => {
    expect.assertions(1)
    const fixture = path.join('tests', 'missing-title')

    return expect(load(fixture)).rejects.toMatchObject({
      message: expect.stringMatching(/^missing "title"$/)
    })
  })

  it('requires authors', () => {
    expect.assertions(1)
    const fixture = path.join('tests', 'missing-authors')

    return expect(load(fixture)).rejects.toMatchObject({
      message: expect.stringMatching(/^missing "authors"$/)
    })
  })
})
