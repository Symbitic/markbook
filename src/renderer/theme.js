import Handlebars from 'handlebars'
import { copyDir, createPath, readFile } from '../common/files'

export default function createTheme (config) {
  const index = createPath('theme/index.hbs')
  const themeDir = createPath('theme')

  const copy = () =>
    copyDir(
      themeDir,
      config.destination,
      name => !/index\.(hbs|pug)/.test(name)
    )

  return readFile(index)
    .then(data => Handlebars.compile(data.toString()))
    .then(template => ({
      template,
      copy
    }))
}
