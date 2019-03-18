/**
 * Detect metadata and add it to the `data` field of a VFile.
 */
import toString from 'mdast-util-to-string'
import visit from 'unist-util-visit'
import { select } from 'unist-util-select'
import { parse as toml } from 'toml'
import { safeLoad as yaml } from 'js-yaml'

export default function metadata(options = {}) {
  return (tree, file) => {
    const heading = select('heading', tree)
    file.data.title = heading ? toString(heading) : ''

    visit(tree, ['yaml'], node => {
      file.data = {
        ...file.data,
        ...yaml(node.value)
      }
    })

    visit(tree, ['toml'], node => {
      file.data = {
        ...file.data,
        ...toml(node.value)
      }
    })
  }
}
