import load from './load'

/**
 * Begin building a book.
 * @param {!string} dir Full path to book directory.
 * @return {BookConfig} Config object.
 */
export default function (dir) {
  return load(dir).then(config => config)
}
