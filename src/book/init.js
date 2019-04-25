import { createPath, readdir, readFile, writeFile } from '../common/files'
import path from 'path'
import { reject } from '../common/errors'
import { status } from '../common/log'

const copy = (author, desc, theme, title, origin, dir, file) => {
  const replace = data =>
    data
      .toString()
      .replace(/@TITLE@/g, title)
      .replace(/@DESC@/g, desc)
      .replace(/@AUTHOR@/g, author)
      .replace(/@THEME@/g, theme ? 'theme: "theme"' : '')
      .replace(/\n\n/g, '\n')

  const name = path.relative(origin, file)
  const output = path.join(dir, name)

  return readFile(file).then(data => writeFile(output, replace(data)))
}

/**
 * Create a new book.
 * @param {!string} dir Path to create a new book in.
 */
export default function init (dir, options) {
  const { author, desc, theme, title } = options

  if (!author) {
    return reject('Missing "author" field')
  } else if (!desc) {
    return reject('Missing "desc" field')
  } else if (!title) {
    return reject('Missing "title" field')
  }

  const defaultDir = createPath('default')
  const themeDir = createPath('theme')

  const args = [author, desc, theme, title]

  const copyFiles = () =>
    readdir(defaultDir).then(files =>
      Promise.all(files.map(file => copy(...args, defaultDir, dir, file)))
    )

  const copyTheme = () =>
    theme
      ? readdir(themeDir).then(files =>
          Promise.all(
            files.map(file =>
              copy(...args, themeDir, path.join(dir, 'theme'), file)
            )
          )
        )
      : Promise.resolve()

  return Promise.all([copyFiles(), copyTheme()]).then(() => status('Finished'))
}
