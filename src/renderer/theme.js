import Handlebars from 'handlebars'
import { copyDir, readFile } from '../common/files'
import path from 'path'

export default function createTheme (config, file = 'index.hbs') {
  const index = path.join(config.theme, file)
  const print = path.join(config.theme, 'print.hbs')

  const exclude = name => !/\.(hbs|pug)/.test(name)

  const copy = () => copyDir(config.theme, config.destination, exclude)

  const compile = data => Handlebars.compile(data.toString())

  return Promise.all([
    readFile(index).then(compile),
    readFile(print).then(compile)
  ]).then(([template, print]) => ({
    template,
    print,
    copy
  }))
}
