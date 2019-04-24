/**
 * Remark plugin for including external files.
 */
import path from 'path'
import visit from 'unist-util-visit'
import * as VFile from 'to-vfile'

const parseInclude = /^@include (.*)(\n|$)/

function transformer (tree, file, processor) {
  visit(tree, ['text'], (node, i, parent) => {
    if (!parseInclude.test(node.value)) {
      return
    }

    const [, filename] = node.value.match(parseInclude)

    const dir = path.dirname(file.history[file.history.length - 1])

    const vfile = VFile.readSync(path.resolve(dir, filename))
    const root = processor.parse(vfile)

    // Recurse
    transformer(root, vfile, processor)

    const { children } = root

    parent.children.splice(i, 1, ...children)
  })
}

export default function include (options = {}) {
  const processor = this

  return (tree, file) => {
    transformer(tree, file, processor)
  }
}
