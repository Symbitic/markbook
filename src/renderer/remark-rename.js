/**
 * Rename a URL.
 * Used to change links from `README.md` to `index.html`.
 */
import visit from 'unist-util-visit'

export default function rename() {
  return tree => {
    visit(tree, ['link', 'definition'], node => {
      node.url = node.url
        .replace(/README\.md/, 'index.html')
        .replace(/\.md/, '.html')
    })
  }
}
