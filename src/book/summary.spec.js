/* eslint-env jest */
import path from 'path'
import summary from './summary'

const case1 = ['parse a basic summary', path.join('tests', 'basic', 'src')]

const case2 = [
  'parse even complex summaries',
  path.join('tests', 'summary', 'complex')
]

const tests = [case1, case2]

describe.each(tests)('book/summary', (name, source) => {
  it(`should ${name}`, () => {
    return expect(summary({ source })).resolves.toMatchSnapshot()
  })
})
