/**
 * Build the finished book.
 */

import path from 'path'
import build from 'book/build.js'
import { handleErrors } from 'common/errors.js'
import { status } from 'common/log.js'

export default function(dir, options = {}) {
  options.open = options.open || false
  const fulldir = path.resolve(dir || '.')
  if (dir) {
    status(`Building in ${dir}`)
  } else {
    status(`Building in default dir`)
  }
  if (options.open) {
    status('Opening in web browser')
  }

  // TODO: Should 'open' be in book/, html/, or server/
  return build(fulldir).catch(handleErrors)
}
