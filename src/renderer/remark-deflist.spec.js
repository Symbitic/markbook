/* global expect */
import deflist from './remark-deflist'
import html from 'rehype-stringify'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import unified from 'unified'

const parse = str =>
  unified()
    .use(markdown)
    .use(deflist)
    .use(remark2rehype)
    .use(html)
    .process(str)
    .then(data => data.toString())

const basic = `
Term 1

: Definition 1
`

const basicOutput = '<p><dl><dt>Term 1</dt><dd>Definition 1</dd></dl></p>'

const tests = [['basic definition list', basic, basicOutput]]

describe.each(tests)('remark-deflist', (name, source, expected) => {
  it(`should parse a ${name}`, () => {
    expect(parse(source)).resolves.toBe(expected)
  })
})
