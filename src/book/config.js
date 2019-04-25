/**
 * Book configuration object.
 * @typedef {Object} BookConfig
 * @property {string} title - Book title.
 * @property {string} version - Book version.
 * @property {string} description - Description.
 * @property {string[]} authors - Authors.
 * @property {string} config - Path to config file.
 * @property {string} root - Path to root directory of current book.
 * @property {string} source - Path to markdown source code.
 * @property {string} destination - Path of output.
 * @property {Summary} summary - Summary.
 */

import * as Joi from 'joi'
import { reject } from '../common/errors'
import path from 'path'
import { createPath } from '../common/files'

const schema = Joi.object({
  title: Joi.string().required(),
  version: Joi.string().regex(/^\d{1,2}(\.\d{1,2})?(\.\d{1,2}$)?/),
  description: Joi.string(),
  authors: Joi.array().items(Joi.string().required(), Joi.string()),
  src: Joi.string(),
  build: Joi.string(),
  theme: Joi.string()
})

/**
 * Convert the results from cosmiconfig into markbook configuration.
 * @param {Object} result - Result from cosmiconfig.
 * @return {Promise<BookConfig>} Markbook configuration.
 */
export default function (result) {
  if (!result || result.isEmpty) {
    return reject('Config file not found or empty')
  }

  const { error, value } = Joi.validate(result.config, schema)
  if (error) {
    const { label, value } = error.details[0].context
    const errmsg = `${value ? 'invalid' : 'missing'} "${label}"`
    return reject(errmsg)
  }

  const ret = { ...result, config: value }

  const filepath = path.relative(process.cwd(), ret.filepath)

  const root = path.dirname(filepath)
  const source = path.join(root, ret.config.src || 'src')
  const destination = path.join(root, ret.config.build || 'book')
  const theme =
    ret.config.theme && ret.config.theme.length
      ? path.join(root, ret.config.theme)
      : createPath('theme')

  return Promise.resolve({
    root,
    source,
    destination,
    theme,
    title: ret.config.title,
    version: ret.config.version,
    description: ret.config.description,
    authors: ret.config.authors,
    config: filepath,
    summary: {
      prefix: [],
      chapters: [],
      suffix: []
    }
  })
}
