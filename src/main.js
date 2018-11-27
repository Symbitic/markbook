/* eslint-disable no-console, no-unused-vars */
import commander from 'commander'
import pkg from '../package.json'
import markbook from 'markbook'

commander.version(pkg.version, '-v, --version')
commander.description(pkg.description)

commander.on('--help', () => {
  console.log('')
  console.log('Examples:')
  console.log('  $ markbook -h')
  console.log('  $ markbook --help')
  console.log('')
  console.log(
    "To see the options for a specific command, use 'markbook <cmd> --help'"
  )
  console.log('Such as:')
  console.log('  $ markbook init --help')
})

commander
  .command('init [name]')
  .description('Create a new book')
  .option('-t, --theme [theme]', 'Copy [theme] to the directory')
  .action((name, options) => {
    // const theme = options.theme || 'default'
    if (name) {
      console.log('Init in new directory %s', name)
    } else {
      console.log('Init in current directory')
    }
  })

// .action().on('--help', () => {})

commander.parse(process.argv)
if (!commander.args.length || typeof commander.args[1] !== 'object')
  commander.help()

console.log('Done')
console.log(markbook)
