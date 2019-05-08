/**
 * Create an ePub file.
 */
import archiver from 'archiver'
import bibliography from 'remark-bibliography'
import deflist from 'remark-deflist'
import epub from './remark/remark-epub'
import frontmatter from 'remark-frontmatter'
import fs from 'fs'
import Handlebars from 'handlebars'
import html from 'rehype-stringify'
import include from './remark/remark-include'
import katex from 'rehype-katex'
import math from 'remark-math'
import markdown from 'remark-parse'
import meta from 'remark-meta'
import path from 'path'
import remark2rehype from 'remark-rehype'
import supersub from 'remark-supersub'
import unified from 'unified'
import yamlConfig from 'remark-yaml-config'
import { createPath, readFile, readVFile, writeFile } from '../common/files'
import { status } from '../common/log'

const createProcessor = () =>
  unified()
    .use(markdown, {
      footnotes: true
    })
    .use(frontmatter)
    .use(yamlConfig)
    .use(include)
    .use(math)
    .use(deflist)
    .use(supersub)
    .use(meta)
    .use(bibliography)
    .use(epub)
    .use(remark2rehype)
    .use(katex)
    .use(html, {
      closeSelfClosing: true
    })

const zip = (filename, dir, files) =>
  new Promise((resolve, reject) => {
    const output = fs.createWriteStream(filename)
    const archive = archiver('zip', {
      zlib: { level: 0 }
    })
    output.on('close', () => resolve())
    archive.on('error', err => reject(err))
    archive.pipe(output)
    files.forEach(name => {
      const file = path.join(dir, name)
      archive.file(file, { name })
    })
    archive.finalize()
  })

export default async function (config) {
  const epubDataDir = createPath('epub')
  const epubFilename = path.join(epubDataDir, 'epub.hbs')
  const processor = createProcessor()
  const compile = params => data => Handlebars.compile(data.toString())(params)

  const epubTemplate = await readFile(epubFilename).then(data =>
    Handlebars.compile(data.toString())
  )

  // Create list of XHTML files to generate.
  const htmlFiles = [
    ...config.summary.prefix,
    ...config.summary.chapters,
    ...config.summary.suffix
  ].map(({ url }) => [
    path.join(config.source, url),
    url
      .split(path.sep)
      .join('-')
      .replace(/README\.md$/, 'index.md')
      .replace(/\.md$/, '')
      .concat('.xhtml')
  ])

  // Create Table of Contents
  const toc = [
    ...config.summary.prefix,
    ...config.summary.chapters,
    ...config.summary.suffix
  ].map(({ title, url }, i) => ({
    title,
    url: url
      .split(path.sep)
      .join('-')
      .replace(/README\.md$/, 'index.md')
      .replace(/\.md$/, '')
      .concat('.xhtml'),
    i: i + 1
  }))

  // Render and copy all XHTML files.
  await Promise.all(
    htmlFiles.map(([input, output]) =>
      readVFile(input)
        .then(processor.process)
        .then(content => {
          const epub = path.join(config.destination, 'epub', 'EPUB', output)
          const data = epubTemplate({
            title: config.title,
            content
          })

          status(`Writing ${output}`)

          return writeFile(epub, data)
        })
    )
  )

  // List of epub data files
  const epubFiles = [
    ['mimetype'],
    [path.join('META-INF', 'container.xml')],
    [
      path.join('EPUB', 'content.opf'),
      {
        title: config.title,
        language: 'en-US',
        creator: 'Me',
        description: 'Brief Description',
        items: htmlFiles.map(([, output]) => output) // TODO: need unix-like
      }
    ],
    [
      path.join('EPUB', 'toc.ncx'),
      {
        title: config.title,
        creator: 'Me',
        toc
      }
    ],
    [
      path.join('EPUB', 'toc.xhtml'),
      {
        title: config.title,
        toc
      }
    ]
  ]

  // Copy required epub files.
  await Promise.all(
    epubFiles.map(([name, params = {}]) =>
      readFile(path.join(epubDataDir, name))
        .then(compile(params))
        .then(data =>
          writeFile(path.join(config.destination, 'epub', name), data)
        )
    )
  )

  // List of all epub files to zip.
  const files = [
    'mimetype',
    ...htmlFiles.map(([, name]) => `EPUB/${name}`),
    ...epubFiles.map(([name]) => name).filter(str => !/^mimetype$/.test(str))
  ]

  status('Generating book.epub')

  // Generate the final EPUB file.
  await zip(
    path.join(config.destination, 'book.epub'),
    path.join(config.destination, 'epub'),
    files
  )

  return config
}
