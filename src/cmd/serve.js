import path from 'path'
import build from '../book/build'
import createServer from '../server/serve'
import { handleErrors } from '../common/errors'
import { status } from '../common/log'

/**
 * Run a web server for previewing a book.
 */
export default function(dir, options) {
  const fulldir = path.resolve(dir || '.')
  if (dir) {
    status(`Serving ${dir}`)
  } else {
    status('Serving the default dir')
  }

  status(`Hostname: ${options.hostname}`)
  status(`Port: ${options.port}`)

  const serve = createServer(options.hostname, options.port)

  return build(fulldir)
    .then(serve)
    .catch(handleErrors)
}
