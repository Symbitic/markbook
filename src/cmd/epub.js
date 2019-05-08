/**
 * Generate an ePub 3.0 document.
 */

import path from 'path'
import load from '../book/load'
import epub from '../renderer/epub'
import { handleErrors } from '../common/errors'
import { status } from '../common/log'

export default function (dir, options = {}) {
  options.open = options.open || false
  const fulldir = path.resolve(dir || '.')
  if (dir) {
    status(`Creating in ${dir}`)
  } else {
    status('Creating in default dir')
  }

  return load(fulldir)
    .then(epub)
    .catch(handleErrors)
}
