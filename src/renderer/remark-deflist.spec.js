/* global expect */
import deflist from './remark-deflist'
import html from 'rehype-stringify'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import unified from 'unified'

const strip = ([str]) => str.replace(/\n +/g, '\n')

const parse = str =>
  unified()
    .use(markdown)
    .use(deflist)
    .use(remark2rehype)
    .use(html)
    .process(str)
    .then(data => data.toString())

const tests = [
  [
    'basic definition list',
    strip`
      Term 1
      
      : Definition 1
    `
  ],
  [
    'basic definition list + bold',
    strip`
      Term 1

      : Definition **1**
    `
  ]
]

describe.each(tests)('remark-deflist', (name, source) => {
  it(`should parse a ${name}`, () => {
    expect(parse(source)).resolves.toMatchSnapshot()
  })
})
