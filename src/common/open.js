/**
 * @fileoverview Open a file/URL.
 * @author Alex Shaw <alex.shaw.as@gmail.com>
 * @note Shamelessly stolen from https://github.com/sindresorhus/opn
 */
import cp from 'child_process'
import isWsl from 'is-wsl'

const spawn = (cmd, args) =>
  new Promise((resolve, reject) =>
    cp
      .spawn(cmd, args)
      .once('error', reject)
      .once('close', ret =>
        ret > 0 ? reject(new Error(`Exited with code ${ret}`)) : resolve()
      )
  )

const getCommand = uri => {
  if (process.platform === 'darwin') {
    return ['open', '-W', uri]
  } else if (process.platform === 'win32' || isWsl) {
    return [
      `cmd${isWsl ? '.exe' : ''}`,
      '/c',
      'start',
      '""',
      '/b',
      '/wait',
      uri.replace(/&/g, '^&')
    ]
  } else {
    return ['xdg-open', uri]
  }
}

export default function open(uri) {
  console.log(isWsl)
  const [cmd, ...args] = getCommand(uri)
  return spawn(cmd, args)
}
