/**
 * Build the finished book.
 */

import path from 'path'
import build from '../book/build'
import { handleErrors } from '../common/errors'
import { status } from '../common/log'
import open from '../common/open'

export default function (dir, options = {}) {
  options.open = options.open || false
  const fulldir = path.resolve(dir || '.')
  if (dir) {
    status(`Building in ${dir}`)
  } else {
    status('Building in default dir')
  }
  if (options.open) {
    status('Opening in web browser')
  }

  return build(fulldir)
    .then(
      config =>
        options.open &&
        open(`file://${path.join(config.destination, 'index.html')}`)
    )
    .catch(handleErrors)
}
