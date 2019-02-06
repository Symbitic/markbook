import { status } from 'common/log'

/**
 * Create a new markbook.
 */
export default function (name, options = {}) {
  options.theme = options.theme || 'default'
  if (name) {
    status(`Init in ${name}`)
  } else {
    status('Init in current directory')
  }
  status(`Theme: ${options.theme}`)
}
