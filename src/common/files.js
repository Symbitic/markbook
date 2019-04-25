import fs from 'fs'
import mkdir from 'make-dir'
import path from 'path'
import util from 'util'
import vfile from 'to-vfile'
import { reject } from './errors'

const readFileEx = util.promisify(fs.readFile)
const writeFileEx = util.promisify(fs.writeFile)
const readdirEx = util.promisify(fs.readdir)
const stat = util.promisify(fs.stat)
const pass = () => true

export const createPath = (...args) =>
  process.env.NODE_ENV === 'test'
    ? path.join('data', ...args)
    : path.resolve(__dirname, '..', 'data', ...args)

export const readFile = (filename, ...args) =>
  readFileEx(filename, ...args).catch(() => reject(`Error reading ${filename}`))

export const readVFile = filename =>
  vfile.read(filename).catch(() => reject(`Error reading ${filename}`))

export const writeFile = (filename, ...args) =>
  mkdir(path.dirname(filename))
    .then(() => writeFileEx(filename, ...args))
    .catch(() => reject(`Error writing to ${filename}`))

export const readdir = dir =>
  readdirEx(dir)
    .then(subdirs =>
      Promise.all(
        subdirs.map(subdir => {
          const res = path.join(dir, subdir)
          return stat(res)
            .then(stats => stats.isDirectory())
            .then(ret => (ret ? readdir(res) : res))
        })
      )
    )
    .then(files => files.reduce((a, f) => a.concat(f), []))

export const copyDir = (source, destination, exclude = pass) =>
  readdir(source).then(files =>
    Promise.all(
      files.filter(exclude).map(src => {
        const dest = path.resolve(destination, path.relative(source, src))
        return readFile(src).then(data => writeFile(dest, data))
      })
    )
  )
