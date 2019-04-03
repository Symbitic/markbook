import path from 'path'
import render from '../renderer/render'
import load from '../book/load'
import createServer from '../server/serve'
import { handleErrors } from '../common/errors'
import { status } from '../common/log'

/**
 * Run a web server for previewing a book.
 */
export default function (dir, options) {
  const fulldir = path.resolve(dir || '.')
  if (dir) {
    status(`Serving ${dir}`)
  } else {
    status('Serving the default dir')
  }

  status(`Hostname: ${options.hostname}`)
  status(`Port: ${options.port}`)

  const serve = createServer(fulldir, options.hostname, options.port)

  return load(fulldir)
    .then(render)
    .then(serve)
    .catch(handleErrors)
}
