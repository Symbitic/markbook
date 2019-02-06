import path from 'path'

const ROOT = __dirname
global.fixtures = (...args) => path.resolve(ROOT, 'fixtures', ...args)
