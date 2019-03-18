/**
 * Render Commonmark.
 *
 * @todo Use serial-promise code from home.
 */
import path from 'path'
import { status } from 'common/log.js'
import { readVFile, writeFile } from 'common/files.js'
import createTheme from './theme.js'
import createProcessor from './markdown.js'
import createToc from './toc.js'

const renderFile = (file, processor) => readVFile(file).then(processor.process)

function write(file, config, template, vfile) {
  const content = vfile.contents.toString().replace(/\n/g, '\n            ')

  // Make sure we don't end up with a title like "Markbook - Markbook"
  const title = vfile.data.title
    ? `${config.title} - ${vfile.data.title}`
        .replace(`${config.title} - ${config.title}`, config.title)
        .replace(/\s-\s$/, '')
    : config.title

  // Replace ".md" with ".html" and use "index.html" instead of "README.md"
  const filename = file.url
    .replace(/README\.md$/, 'index.md')
    .replace(/\.md$/, '')
    .concat('.html')
  const filepath = path.join(config.destination, filename)

  // Calculate root for CSS/JS/Links
  const root = path.relative(path.dirname(filepath), config.destination)

  const data = template({
    ...vfile.data,
    book_title: config.title,
    // toc: createToc(config),
    ...config.toc,
    toc: config.toc,
    content,
    title,
    root
  })

  status('Writing', filename)

  return writeFile(filepath, data)
}

const renderFiles = (config, processor, theme, files) => {
  const cb = file => {
    const input = path.join(config.source, file.url)
    return renderFile(input, processor).then(vfile =>
      write(file, config, theme.template, vfile)
    )
  }

  return Promise.all(files.map(cb)).then(theme.copy)
}

export default async function render(config) {
  const files = [
    ...config.summary.prefix,
    ...config.summary.chapters,
    ...config.summary.suffix
  ]

  const processor = createProcessor()

  config.toc = createToc(config)

  return createTheme(config)
    .then(theme => renderFiles(config, processor, theme, files))
    .then(() => {
      status('Done')
    })
}
