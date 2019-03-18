/**
 * Error-handling related functions.
 */
import { error } from './log.js'

/**
 * Reject with the given reason.
 * @param {string} msg - Error message.
 * @return A Promise that is rejected with the given reason.
 */
export const reject = msg => Promise.reject(new Error(msg))

/**
 * Generic rejection handler (insert dating joke here).
 *
 * Intended to be used as part of a Promise chain.
 * @param {Error} err - Standard Javascript Error object.
 */
export const handleErrors = err => {
  error(err.message ? err.message : err)
  process.exit(1)
}

export default {
  handleErrors,
  reject
}
