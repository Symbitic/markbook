/* eslint-env jest */
import fs from 'fs'
import init from './init'

jest.mock('fs')

afterEach(fs.clear)

const case1 = [
  'create a new book',
  'book-1',
  'The Israelites',
  'The (nonliteral) word of God',
  'The Bible'
]

const case2 = [
  'reject without an author',
  'bad-author',
  '',
  'A book without an author',
  'Author-less book'
]

const case3 = [
  'reject without a description',
  'bad-desc',
  'Nobody',
  '',
  'Description-less book'
]

const case4 = [
  'reject without a title',
  'bad-title',
  'Nobody',
  'A book without a name',
  ''
]

const tests = [case1, case2, case3, case4]

const snapshot = (book, author, desc, title) =>
  expect(
    init(book, { author, desc, title }).then(fs.filesystem)
  ).resolves.toMatchSnapshot()

const missingAuthor = (book, author, desc, title) =>
  expect(
    init(book, { author, desc, title }).then(fs.filesystem)
  ).rejects.toThrow('Missing "author" field')

const missingDesc = (book, author, desc, title) =>
  expect(
    init(book, { author, desc, title }).then(fs.filesystem)
  ).rejects.toThrow('Missing "desc" field')

const missingTitle = (book, author, desc, title) =>
  expect(
    init(book, { author, desc, title }).then(fs.filesystem)
  ).rejects.toThrow('Missing "title" field')

describe.each(tests)('book/init', (name, book, author, desc, title) => {
  it(`should ${name}`, () => {
    if (!author) {
      return missingAuthor(book, author, desc, title)
    } else if (!desc) {
      return missingDesc(book, author, desc, title)
    } else if (!title) {
      return missingTitle(book, author, desc, title)
    } else {
      return snapshot(book, author, desc, title)
    }
  })
})
