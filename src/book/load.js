import cosmiconfig from 'cosmiconfig'
import config from './config.js'
import summary from './summary.js'

/**
 * Load the configuration for a book.
 * @param {!string} dir Full path to book directory.
 * @return {BookConfig} Config object.
 */
export default function load (dir) {
  const explorer = cosmiconfig('markbook', {
    searchPlaces: ['markbook.yml', 'markbook.yaml', 'markbook.json']
  })
  return explorer
    .search(dir)
    .then(config)
    .then(summary)
}
