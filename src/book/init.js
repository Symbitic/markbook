import inquirer from 'inquirer'
import { createPath, readdir, readFile, writeFile } from '../common/files'
import path from 'path'
import { status } from '../common/log'

const copyFile = ({ title, desc, author, defaultDir, dir }) => input => {
  const replace = data =>
    data
      .toString()
      .replace(/@TITLE@/g, title)
      .replace(/@DESC@/g, desc)
      .replace(/@AUTHOR@/g, author)

  const name = path.relative(defaultDir, input)
  const output = path.join(dir, name)

  return readFile(input).then(data => writeFile(output, replace(data)))
}

function copyFiles (dir, answers) {
  const defaultDir = createPath('default')

  const copy = copyFile({
    ...answers,
    dir,
    defaultDir
  })

  return readdir(defaultDir).then(files => Promise.all(files.map(copy)))
}

/**
 * Create a new book.
 * @param {!string} dir Path to create a new book in.
 */
export default function init (dir, options) {
  // TODO: if (options.theme === true)

  const { title, author, description } = options
  const defaultAnswers = {
    author,
    desc: description,
    title
  }

  const questions = []
    .concat(
      !title && {
        type: 'input',
        name: 'title',
        message: 'Enter book title:',
        validate: val => (val && val.length ? true : 'Must enter a book title')
      }
    )
    .concat(
      !description && {
        type: 'input',
        name: 'desc',
        message: 'Enter book description:'
      }
    )
    .concat(
      !author && {
        type: 'input',
        name: 'author',
        message: 'Enter author name:',
        validate: val =>
          val && val.length ? true : 'Must enter an author name'
      }
    )
    .filter(i => typeof i === 'object')

  return inquirer
    .prompt(questions)
    .then(answers =>
      copyFiles(dir, {
        ...defaultAnswers,
        ...answers
      })
    )
    .then(() => status('Finished'))
}
