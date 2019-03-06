import fs from 'fs'
import path from 'path'
import util from 'util'
import vfile from 'to-vfile'
import { reject } from './errors.js'

const readFileEx = util.promisify(fs.readFile)
const writeFileEx = util.promisify(fs.writeFile)
const mkdirEx = util.promisify(fs.mkdir)

export const readFile = (filename, ...args) =>
  readFileEx(filename, ...args).catch(() => reject(`Error reading ${filename}`))

export const readVFile = filename =>
  vfile.read(filename).catch(() => reject(`Error reading ${filename}`))

export const writeFile = (filename, ...args) =>
  mkdir(path.dirname(filename))
    .then(() => writeFileEx(filename, ...args))
    .catch(() => reject(`Error writing to ${filename}`))

export const mkdir = dir => mkdirEx(dir, { recursive: true })
