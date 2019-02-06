import log from 'common/log'

/**
 * Run a web server for previewing a book.
 */
export default function (dir, options) {
  if (dir) {
    log.status('Serving %s', dir)
  } else {
    log.status('Serving the default directory')
  }
  log.status('Hostname: %s', options.hostname)
  log.status('Port: %d', options.port)
}
