/**
 * Remark plugin for formatting content for EPUB.
 */
import visit from 'unist-util-visit'

export default function (options = {}) {
  return tree => {
    // Make DT/DL/DD compliant with EPUB
    visit(tree, ['paragraph'], (node, i, parent) => {
      if (
        node.children.length !== 1 ||
        node.children[0].type !== 'descriptionlist'
      ) {
        return
      }

      const child = node.children[0]

      parent.children.splice(i, 1, child)
    })

    // Change links to EPUB spec (cli/README.md -> cli-index.xhtml)
    visit(tree, ['link', 'definition'], node => {
      node.url = node.url
        .replace(/README\.md/, 'index.xhtml')
        .replace(/\.md/, '.xhtml')

      if (!/^(http|:\/\/)/.test(node.url)) {
        node.url = node.url.split('/').join('-')
      }
    })
  }
}
