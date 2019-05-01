/**
 * Build printable HTML/PDF.
 */

import path from 'path'
import load from '../book/load'
import print from '../renderer/print'
import pdf from '../backends/pdf'
import { handleErrors } from '../common/errors'
import { status } from '../common/log'

export default function (dir, options = {}) {
  options.open = options.open || false
  const fulldir = path.resolve(dir || '.')
  if (dir) {
    status(`Printing in ${dir}`)
  } else {
    status('Printing in default dir')
  }

  return load(fulldir)
    .then(print)
    .then(pdf)
    .catch(handleErrors)
}
