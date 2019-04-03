import Handlebars from 'handlebars'
import { copyDir, readFile } from '../common/files'
import path from 'path'

export default function createTheme (config) {
  const index = path.join(config.theme, 'index.hbs')

  const exclude = name => !/index\.(hbs|pug)/.test(name)

  const copy = () => copyDir(config.theme, config.destination, exclude)

  return readFile(index)
    .then(data => Handlebars.compile(data.toString()))
    .then(template => ({
      template,
      copy
    }))
}
