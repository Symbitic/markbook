/**
 * Render Commonmark.
 */
import html from 'rehype-stringify'
import markdown from 'remark-parse'
import path from 'path'
import remark2rehype from 'remark-rehype'
import unified from 'unified'
import { status } from 'common/log.js'
import { reject } from 'common/errors.js'
import { readVFile, writeFile } from 'common/files.js'
import createTheme from './theme'

const mapP = (items, cb) => Promise.all(items.map(cb))

const renderFile = (file, processor) => {
  return readVFile(file)
    .then(data => processor.process(data))
    .then(data => data.contents.toString())
}

function write (file, config, template, html) {
  const filename = file.url.replace(/\.md$/, '').concat('.html')
  const filepath = path.join(config.destination, filename)

  const content = template({
    content: html,
    title: config.title
  })

  status('Writing', filename)

  return writeFile(filepath, content)
}

const createRenderer = (config, processor, theme) => {
  return file => {
    const input = path.join(config.source, file.url)
    return renderFile(input, processor)
      .then(html => write(file, config, theme, html))
      .catch(() => reject(`Error rendering ${file.url}`))
  }
}

export default async function render (config) {
  const files = [
    ...config.summary.prefix,
    ...config.summary.chapters,
    ...config.summary.suffix
  ]

  const processor = unified()
    .use(markdown)
    .use(remark2rehype)
    .use(html)

  return createTheme()
    .then(theme => createRenderer(config, processor, theme))
    .then(render => mapP(files, render))
    .then(() => {
      status('Done')
    })
}
