import init from '../book/init'
import path from 'path'
import { status } from '../common/log'

/**
 * Create a new markbook.
 */
export default function (dir, options = {}) {
  const fulldir = path.resolve(dir || '.')
  if (dir) {
    status(`Creating new book in ${dir}`)
  } else {
    status('Creating new book in current dir')
  }

  return init(fulldir, options)
}
