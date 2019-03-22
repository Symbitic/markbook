import cosmiconfig from 'cosmiconfig'
import fs from 'fs'
import { reject } from '../common/errors'
import util from 'util'
import summary from './summary'
import config from './config'

const stat = util.promisify(fs.stat)

const check = dir =>
  stat(dir)
    .catch(() => reject(`${dir} not found`))
    .then(stats =>
      stats.isDirectory() ? dir : reject(`${dir} is not a directory`)
    )

/**
 * Load the configuration for a book.
 * @param {!string} dir Full path to book directory.
 * @return {BookConfig} Config object.
 */
export default function load(dir) {
  const explorer = cosmiconfig('markbook', {
    searchPlaces: ['markbook.yml', 'markbook.yaml', 'markbook.json']
  })
  return check(dir)
    .then(dir => explorer.search(dir))
    .then(config)
    .then(summary)
}
