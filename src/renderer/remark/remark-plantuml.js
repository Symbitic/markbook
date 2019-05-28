/**
 * Remark plugin for rendering PlantUML syntax
 */
import axios from 'axios'
import { encode } from 'plantuml-encoder'
import visit from 'unist-util-visit'

export default function (options = {}) {
  return async (tree, file) => {
    const nodes = []

    visit(tree, ['code'], (node, i, parent) => {
      if (node.lang !== 'plantuml') {
        return
      }
      nodes.push([parent, i, node.value])
    })

    if (!nodes.length) {
      return
    }

    for (const [parent, i, value] of nodes) {
      const base64 = encode(value)
      const { data } = await axios(
        `http://www.plantuml.com/plantuml/svg/${base64}`
      )

      const node = {
        type: 'image',
        url: `data:image/svg+xml;utf8,${encodeURIComponent(data)}`,
        title: 'PlantUML image',
        alt: 'PlantUML image'
      }

      parent.children.splice(i, 1, node)
    }

    return tree
  }
}
