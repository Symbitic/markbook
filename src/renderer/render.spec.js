/* eslint-env jest */
import { createPath } from '../common/files'
import fs from 'fs'
import path from 'path'
import render from './render'

jest.mock('fs')

afterEach(fs.clear)

const themeDir = createPath('theme')

const case1 = [
  'render a basic book',
  {
    title: 'Book 1',
    source: path.join('tests', 'basic', 'src'),
    destination: 'book-1',
    theme: themeDir,
    summary: {
      prefix: [],
      chapters: [
        {
          level: 1,
          title: 'Chapter 1',
          url: 'chapter-1.md'
        }
      ],
      suffix: []
    }
  }
]

const tests = [case1]

describe.each(tests)('renderer/render', (name, config) => {
  it(`should ${name}`, () => {
    return expect(render(config).then(fs.filesystem)).resolves.toMatchSnapshot()
  })
})
