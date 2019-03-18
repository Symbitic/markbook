/**
 * Yes. This is needlessly big and complex. And it isn't particularly
 * functional-style.
 *
 * Who's bright idea was it to use a markdown file to specify the
 * table-of-contents in a markdown file?
 *
 * @todo Might need to add assert that level is never bigger than 2.
 */

import { reject } from 'common/errors.js'
import markdown from 'remark-parse'
import path from 'path'
import unified from 'unified'
import vfile from 'to-vfile'

/**
 * Summary item.
 * @typedef {Object} SummaryItem
 * @property {string} name - Chapter name.
 * @property {string} filename - Path to the chapter's source file.
 */

/**
 * Summary object
 * @typedef {Object} Summary
 * @property {SummaryItem[]} prefix - Chapters before the main text (e.g. an introduction).
 * @property {SummaryItem[]} chapters - The main body of the book.
 * @property {SummaryItem[]} suffix - Chapters after the main text (e.g. a conclusion).
 */

/**
 * Split remark tree into headers, prefixes, lists, and suffixes
 * @todo Really need to make this more FP-style. Recursion, Object.assign, etc.
 * @todo Maybe delete all root non-heading/paragraph/list nodes.
 */
const split = tree => {
  let isDone = false
  let index = 0

  const headers = tree.children.filter((node, i) => {
    if (isDone) {
      return false
    } else if (node.type === 'heading') {
      return true
    } else {
      index = i
      isDone = true

      return false
    }
  })

  isDone = false

  const prefixes = tree.children.slice(index).filter((node, i) => {
    if (isDone) {
      return false
    } else if (node.type === 'paragraph') {
      return true
    } else {
      isDone = true
      index = index + i
      return false
    }
  })

  isDone = false

  const lists = tree.children.slice(index).filter((node, i) => {
    if (isDone) {
      return false
    } else if (node.type === 'list') {
      return true
    } else {
      isDone = true
      index = index + i
      return false
    }
  })

  isDone = false

  const suffixes = tree.children.slice(index).filter((node, i) => {
    if (isDone) {
      return false
    } else if (node.type === 'paragraph') {
      return true
    } else {
      isDone = true
      index = index + i
      return false
    }
  })

  return {
    headers,
    prefixes,
    lists,
    suffixes
  }
}

/**
 * ES6 compose function.
 */
const compose = (...fns) =>
  fns.reduceRight((f, g) => (...args) => f(g(...args)))

/**
 * Method for flattening nested arrays. Intended for .reduce()
 */
const flattener = (acc, val) =>
  Array.isArray(val) ? acc.concat(val.reduce(flattener, [])) : acc.concat(val)

/**
 * Remove unneeded properties from links arrays.
 */
const removeExtra = items =>
  items.map(item => {
    const { type, children, url, value } = item
    return JSON.parse(
      JSON.stringify({
        type,
        url,
        value,
        children: Array.isArray(children) ? removeExtra(children) : children
      })
    )
  })

/**
 * Extract the header.
 */
const extractHeader = headers =>
  headers
    .map(node => node.children)
    .reduce(flattener, [])
    .map(node => (node.value ? node.value : ''))[0] // eslint-disable-line no-unexpected-multiline

/**
 * Extract the prefix.
 */
const extractPrefix = items =>
  items
    .map(node => node.children.filter(node => node.type === 'link'))
    .reduce(flattener, [])
    .map(node => ({
      title: node.children.reduce(
        (acc, val) => (val.type === 'text' ? acc.concat(val.value) : acc),
        ''
      ),
      url: node.url
    }))

/**
 * Extract the suffix.
 */
const extractSuffix = items =>
  items
    .map(node => node.children.filter(node => node.type === 'link'))
    .reduce(flattener, [])
    .map(node => ({
      title: node.children.reduce(
        (acc, val) => (val.type === 'text' ? acc.concat(val.value) : acc),
        ''
      ),
      url: node.url
    }))

/**
 * Find paragraph nodes and add them (including a nested level indicator).
 */
const findParagraphs = (items, i = 0) =>
  items.reduce((acc, val) => {
    if (val.type === 'paragraph') {
      return acc.concat({
        ...val,
        level: i / 2
      })
    } else {
      return acc.concat(findParagraphs(val.children, i + 1))
    }
  }, [])

/**
 * Flatten the links array to just what is needed.
 */
const flattenLinks = items =>
  items.reduce((acc, val) => {
    if (
      val.children &&
      val.children.length === 1 &&
      val.children[0].type === 'link'
    ) {
      return acc.concat({
        title: val.children[0].children[0].value,
        url: val.children[0].url,
        level: val.level
      })
    } else if (Array.isArray(val.children)) {
      return acc.concat(flattenLinks(val.children))
    } else {
      return acc.concat(val)
    }
  }, [])

/**
 * Remove anything that isn't a link item from this array.
 */
const linksOnly = items =>
  items.filter(
    item => item.title && item.title.length && item.url && item.url.length
  )

/**
 * Extract the different chapters.
 */
const extractChapters = compose(
  removeExtra,
  findParagraphs,
  flattenLinks,
  linksOnly
)

/**
 * Read a file (wrapped for better reject messages).
 */
const readFile = filename =>
  vfile.read(filename).catch(() => reject('SUMMARY.md not found', __filename))

/**
 * Parse SUMMARY.md (wrapped for better reject messages).
 */
const parse = file =>
  Promise.resolve(file)
    .then(file => {
      const tree = unified()
        .use(markdown)
        .parse(file)

      const { headers, prefixes, lists, suffixes } = split(tree)

      const header = extractHeader(headers)
      const prefix = extractPrefix(prefixes)
      const chapters = extractChapters(lists)
      const suffix = extractSuffix(suffixes)

      return {
        header,
        prefix,
        chapters,
        suffix
      }
    })
    .catch(() => reject('Error parsing SUMMARY.md'))

/**
 * Load and parse a SUMMARY.md file.
 * @param {!string} filename - Path to `SUMMARY.md`.
 * @returns {Summary} An object representing the books contents.
 */
export default function(config) {
  const summary = path.join(config.source, 'SUMMARY.md')

  return readFile(summary)
    .then(parse)
    .then(summary => ({
      ...config,
      summary
    }))
}
