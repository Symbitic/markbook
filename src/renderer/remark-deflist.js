/**
 * Remark DefinitionList plugin.
 * @todo release this.
 */

import visit from 'unist-util-visit'
import toString from 'mdast-util-to-string'

const isdeflist = (node, i, parent) =>
  i > 0 &&
  /^:\s/.test(toString(node)) &&
  !/^:\s/.test(toString(parent.children[i - 1])) &&
  node.type === 'paragraph' &&
  parent.children[i - 1].type === 'paragraph'

export default function deflist (options = {}) {
  return (tree, file) => {
    // console.log(tree)
    visit(tree, ['paragraph'], (node, i, parent) => {
      const isdef = isdeflist(node, i, parent)
      if (!isdef) {
        return
      }

      // Remove the ": " that we use to identify a deflist to begin with.
      visit(node, n => {
        if (typeof n.value !== 'undefined') {
          n.value = n.value.replace(/^:\s+/, '')
        }
      })

      const child = {
        type: 'paragraph',
        children: [
          {
            type: 'descriptionlist',
            data: {
              hName: 'dl'
            },
            children: [
              {
                type: 'descriptionterm',
                data: {
                  hName: 'dt'
                },
                children: parent.children[i - 1].children
              },
              {
                type: 'descriptiondetails',
                data: {
                  hName: 'dd'
                },
                children: node.children
              }
            ]
          }
        ]
      }

      parent.children.splice(i - 1, 2, child)
    })
  }
}
