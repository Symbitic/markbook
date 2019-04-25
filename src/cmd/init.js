import init from '../book/init'
import inquirer from 'inquirer'
import path from 'path'
import { status } from '../common/log'

/**
 * Create a new markbook.
 */
export default function (dir, options = {}) {
  const fulldir = path.resolve(dir || '.')
  if (dir) {
    status(`Creating new book in ${dir}`)
  } else {
    status('Creating new book in current dir')
  }

  const { author, desc, theme, title } = options

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
      !desc && {
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

  return inquirer.prompt(questions).then(answers =>
    init(fulldir, {
      author,
      desc,
      theme,
      title,
      ...answers
    })
  )
}
