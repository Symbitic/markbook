import { handleErrors } from '../common/errors'
import load from '../book/load'
import path from 'path'
import { promisify } from 'util'
import rimraf from 'rimraf'
import { status } from '../common/log'

const rm = promisify(rimraf)
// return build(fulldir).catch(handleErrors('Error building book'))

/**
 * Remove the destination directory.
 */
export default function(dir) {
  const fulldir = path.resolve(dir || '.')
  if (dir) {
    status('Cleaning %s', dir)
  } else {
    status('Cleaning default dir')
  }

  return load(fulldir)
    .then(({ destination }) => rm(destination))
    .catch(handleErrors)
}
