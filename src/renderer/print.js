/**
 * Create a printable HTML file.
 */
import bibliography from 'remark-bibliography'
import deflist from 'remark-deflist'
import frontmatter from 'remark-frontmatter'
import include from './remark/remark-include'
import math from 'remark-math'
import markdown from 'remark-parse'
import meta from 'remark-meta'
import redirect from 'remark-redirect'
import supersub from 'remark-supersub'
import unified from 'unified'
import yamlConfig from 'remark-yaml-config'
import { readVFile, writeFile } from '../common/files'
import hast from 'mdast-util-to-hast'
import html from 'hast-util-to-html'
import createTheme from './theme'
import path from 'path'
import { status } from '../common/log'

function compiler (config) {
  this.Compiler = function (tree) {
    return tree
  }
}

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
    .use(redirect)
    .use(compiler)

export default async function (config) {
  const files = [
    ...config.summary.prefix,
    ...config.summary.chapters,
    ...config.summary.suffix
  ].map(({ url }) => path.join(config.source, url))

  const processor = createProcessor()
  const theme = await createTheme(config)

  const trees = await Promise.all(
    files.map(file => readVFile(file).then(processor.process))
  )

  const children = trees.reduce(
    (acc, val) => acc.concat(val.contents.children),
    []
  )

  // TODO: Might need to change child nodes (such as merge References)

  const node = {
    type: 'root',
    children
  }

  const content = html(hast(node))

  const filename = path.join(config.destination, 'print.html')

  const data = theme.print({
    book_title: config.title,
    content,
    title: config.title,
    root: ''
  })

  status('Writing print.html')

  await writeFile(filename, data)
  await theme.copy()

  return config
}
