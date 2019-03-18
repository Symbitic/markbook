import render from 'renderer/render.js'
import load from './load.js'

/**
 * Begin building a book.
 * @param {!string} dir Full path to book directory.
 * @return {BookConfig} Config object.
 */
export default function build(dir) {
  return load(dir).then(render)
}
