import commander from 'commander'
import { description, version } from '../package.json'
import build from './cmd/build'
import clean from './cmd/clean'
import init from './cmd/init'
import serve from './cmd/serve'

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
  .description('Build a book from its markdown sources')
  .option('-o, --open', 'Open in the book in a web browser')
  .action(build)

commander
  .command('clean [dir]')
  .description('Create a new book')
  .action(clean)

commander
  .command('init [name]')
  .description('Create a new book')
  .option('-t, --theme [theme]', 'Copy [theme] to the directory', 'default')
  .action(init)

commander
  .command('serve [dir]')
  .description(
    'Serves a book at http://localhost:5050, and rebuilds it on changes'
  )
  .option(
    '-h, --hostname [hostname]',
    'Hostname to listen on for HTTP connections [localhost]',
    'localhost'
  )
  .option(
    '-p, --port [port]',
    'Port to listen on for HTTP connections [5050]',
    parseInt,
    5050
  )
  .option('-o, --open', 'Open in the book in a web browser')
  .option(
    '-w, --websocket-port [port]',
    'Port to listen on for WebSockets [5051]',
    parseInt,
    5051
  )
  .action(serve)

commander.parse(process.argv)
if (!commander.args.length || typeof commander.args[1] !== 'object') {
  commander.help()
}
