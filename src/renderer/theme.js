import path from 'path'
import Handlebars from 'handlebars'
import { readFile } from 'common/files.js'

export default function createTheme () {
  const index = path.join(__dirname, '../data/theme/index.hbs')

  return readFile(index).then(data => Handlebars.compile(data.toString()))
}
