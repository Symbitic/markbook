/**
 * Error-handling related functions.
 */
import { error } from './log'

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
 * @param {string} desc - Basic description (ex. "Error building book")
 * @param {Error} err - Standard Javascript Error object.
 */
export const handleErrors = desc => err => {
  error(`${desc}: ${err.message ? err.message : err}`)
  process.exitCode = 1
}

export default {
  handleErrors,
  reject
}
