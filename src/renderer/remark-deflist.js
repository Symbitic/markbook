/**
 * Remark DefinitionList plugin.
 * @todo release this.
 */
import map from 'unist-util-map'
import visit from 'unist-util-visit'

export default function deflist (options = {}) {
  return (tree, file) => {
    map(tree, node => {
      if (node.type !== 'paragraph') {
        return node
      }

      const children = node.children.filter(item => item.type === 'text')
      let isdef = false
      children.forEach(n => {
        if (!isdef) {
          isdef = /^:\s/.test(n.value)
        }
      })
      if (!isdef) {
        return node
      }

      node.type = 'dl'
      node.data = {
        ...node.data,
        hName: 'dl'
      }
      node.children = children.map((child, i) => ({
        type: i % 2 === 0 ? 'dt' : 'dd',
        children: [child],
        data: {
          hName: i % 2 === 0 ? 'dt' : 'dd'
        }
      }))

      // Remove the ": " that we use to identify a deflist to begin with.
      visit(node, n => {
        if (typeof n.value !== 'undefined') {
          n.value = n.value.replace(/^:\s+/, '')
        }
      })

      return node
    })
  }
}
