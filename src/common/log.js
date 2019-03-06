import chalk from 'chalk'
import util from 'util'

const noop = () => {}

const stdout = process.env.NODE_ENV === 'test' ? noop : console.log
const stderr = process.env.NODE_ENV === 'test' ? noop : console.error

export const status = (format, ...args) =>
  stdout(`[Markbook] ${chalk.green.bold(util.format(format, ...args))}`)

export const error = (format, ...args) =>
  stderr(`[Markbook] ${chalk.red.bold(util.format(format, ...args))}`)

export default {
  status,
  error
}
