/**
 * Render CommonMark.
 */
import path from 'path'
import { status } from '../common/log'
import { readVFile, writeFile } from '../common/files'
import createTheme from './theme'
import createProcessor from './markdown'
import createToc from './toc'
import search from './search'

const processFile = (file, processor) => readVFile(file).then(processor.process)

const mapP = (input, cb) => Promise.all(input.map(cb))

function write (name, config, template, vfile) {
  const content = vfile.contents.toString()

  // Make sure we don't end up with a title like "Markbook - Markbook"
  const title = vfile.data.title
    ? `${config.title} - ${vfile.data.title}`
        .replace(`${config.title} - ${config.title}`, config.title)
        .replace(/\s-\s$/, '')
    : config.title

  // Replace ".md" with ".html" and use "index.html" instead of "README.md"
  const filename = name
    .replace(/README\.md$/, 'index.md')
    .replace(/\.md$/, '')
    .concat('.html')
  const filepath = path.join(config.destination, filename)

  // Calculate root for CSS/JS/Links
  const root = path.relative(path.dirname(filepath), config.destination)

  const data = template({
    ...vfile.data,
    book_title: config.title,
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
  const readFiles = file => {
    const input = path.join(config.source, file.url)
    return processFile(input, processor).then(vfile => [vfile, file.url])
  }

  const writeFiles = ([vfile, name]) =>
    write(name, config, theme.template, vfile).then(() => vfile)

  return mapP(files, readFiles)
    .then(vfiles => mapP(vfiles, writeFiles))
    .then(theme.copy)
}

export default function (config) {
  const files = [
    ...config.summary.prefix,
    ...config.summary.chapters,
    ...config.summary.suffix
  ]

  const processor = createProcessor()

  config.toc = createToc(config)

  return createTheme(config)
    .then(theme => renderFiles(config, processor, theme, files))
    .then(() => search(config))
    .then(() => {
      status('Done')
      return config
    })
}
