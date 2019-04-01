/* global expect */
import toc from './toc'

const basicPrefix = {
  prefix: [{ title: 'Markbook', url: 'README.md' }],
  chapters: [],
  suffix: []
}

const chapters = {
  prefix: [],
  chapters: [
    { title: 'Chapter 1', url: 'chapter-1.md', level: 1 },
    { title: 'Chapter 2', url: 'chapter-2.md', level: 1 },
    { title: 'Chapter 2.1', url: 'chapter-2-1.md', level: 2 },
    { title: 'Chapter 2.2', url: 'chapter-2-1.md', level: 2 },
    { title: 'Chapter 3', url: 'chapter-3.md', level: 1 }
  ],
  suffix: []
}

const tests = [['basic prefix', basicPrefix], ['list of chapters', chapters]]

describe.each(tests)('toc', (name, source) => {
  it(`should parse a ${name}`, () => {
    expect(toc({ summary: source })).toMatchSnapshot()
  })
})
