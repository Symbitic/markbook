import commander from 'commander'
import { description, version } from '../package.json'
import build from './cmd/build'
import clean from './cmd/clean'
import init from './cmd/init'
import serve from './cmd/serve'
import print from './cmd/print'

commander
  // Add version
  .version(version, '-v, --version')
  // Add description
  .description(description)

commander.on('--help', () => {
  console.log('')
  console.log('Examples:')
  console.log('  $ markbook --help')
  console.log('')
  console.log(
    "To see the options for a specific command, use 'markbook <cmd> --help'"
  )
  console.log('Such as:')
  console.log('  $ markbook init --help')
})

commander
  .command('build [dir]')
  .description('Build a book')
  .option('-o, --open', 'Open in the book in a web browser')
  .action(build)

commander
  .command('clean [dir]')
  .description("Delete a book's outputs")
  .action(clean)

commander
  .command('init [dir]')
  .description('Create a new book')
  .option('-a, --author [author]', 'Author name')
  .option('-T, --title [title]', 'Book title')
  .option('-d, --desc [desc]', 'Book description')
  .option('-t, --theme', 'Copy the theme to the directory')
  .action(init)

commander
  .command('serve [dir]')
  .description(
    'Serves a book at http://localhost:8080, and rebuilds it on changes'
  )
  .option(
    '-h, --hostname [hostname]',
    'Hostname to listen on for HTTP connections [localhost]',
    'localhost'
  )
  .option(
    '-p, --port [port]',
    'Port to listen on for HTTP connections [8080]',
    parseInt,
    8080
  )
  .option('-o, --open', 'Open in the book in a web browser')
  .action(serve)

commander
  .command('print [dir]')
  .description('Render to a PDF file')
  .action(print)

commander.parse(process.argv)
if (!commander.args.length || typeof commander.args[1] !== 'object') {
  commander.help()
}
