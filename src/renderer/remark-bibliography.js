/**
 * @fileoverview Bibliography & Citations for Remark.
 * @author Alex Shaw
 * @todo Add support for more than just BibJSON
 * @todo Add support for more than just Chicago Style.
 * @todo Add support for more than just Book citations.
 */
import path from 'path'
import fs from 'fs'
import util from 'util'
import visit from 'unist-util-visit'

const readFile = util.promisify(fs.readFile)

const book = (authors, year, title, publisher) => [
  {
    type: 'text',
    value: `${authors}. ${year}. `
  },
  {
    type: 'emphasis',
    children: [{ type: 'text', value: title }]
  },
  {
    type: 'text',
    value: `. ${publisher}. `
  }
]

function chicago (item, i) {
  const authorsList = item.author.map(author => author.lastname)
  const authors =
    authorsList.length >= 4
      ? `${authorsList[0]} et al.`
      : authorsList.join(', ').replace(/, ([^,]+)$/, ', and $1')
  const { id, publisher, title, year } = item
  const key = `@${id}`
  const citation = `${authors} ${year}`
  const bibliography = {
    type: 'listItem',
    spread: false,
    data: {
      hProperties: { id: `ref-${id}`, className: 'reference' }
    },
    children: book(authors, year, title, publisher)
  }
  return {
    id,
    key,
    citation,
    bibliography
  }
}

function bibjson (str) {
  const data = Object.entries(JSON.parse(str))
    .map(([id, item]) => {
      const author = item.author.map(author => {
        const name = author.name
        const islastfirst = /^([^,]+),/.test(name)
        const lastname = islastfirst
          ? /^([^,]+)/.exec(name)[0]
          : /[^ ]+$/.exec(name)[0]
        return {
          name,
          lastname
        }
      })
      return {
        ...item,
        id,
        author
      }
    })
    .map(chicago)

  return data
}

function format (data, ext) {
  switch (ext) {
    case '.json':
      return bibjson(data)
    default:
      return Promise.reject(new Error(`Unrecognized extension: ${ext}`))
  }
}

function citations (tree, items) {
  items.forEach(item => {
    visit(tree, ['text'], (node, i, parent) => {
      const contains = node.value.includes(item.key)
      if (!contains) {
        return
      }
      const values = node.value.split(item.key)
      const children = [
        {
          type: 'text',
          value: values[0]
        },
        {
          type: 'link',
          url: `#ref-${item.id}`,
          data: {
            hProperties: {
              className: 'citation'
            }
          },
          children: [{ type: 'text', value: item.citation }]
        },
        {
          type: 'text',
          value: values[1]
        }
      ]
      parent.children.splice(i, 1, ...children)
    })
  })
}

function references (tree, items) {
  tree.children = tree.children.concat({
    type: 'element',
    data: {
      hName: 'div',
      hProperties: {
        className: 'references'
      }
    },
    children: [
      {
        type: 'heading',
        depth: 2,
        children: [
          {
            type: 'text',
            value: 'References'
          }
        ]
      },
      {
        type: 'list',
        ordered: true,
        spread: false,
        data: {
          hProperties: { className: 'ref-list' }
        },
        children: items.map(item => item.bibliography)
      }
    ]
  })
}

export default function bibliography (options = {}) {
  return (tree, file) => {
    if (!file.data.hasOwnProperty('bibliography')) {
      return
    }
    const dir = path.dirname(file.history[file.history.length - 1])
    const bibfile = path.resolve(dir, file.data.bibliography)
    return readFile(bibfile, 'utf8')
      .then(data => format(data, path.extname(bibfile)))
      .then(items => {
        citations(tree, items)
        references(tree, items)
      })
  }
}
