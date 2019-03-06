import babel from 'rollup-plugin-babel'
import { builtinModules } from 'module'
import executable from 'rollup-plugin-executable'
import json from 'rollup-plugin-json'
import pkg from './package.json'
import resolve from 'rollup-plugin-node-resolve'

const external = [...builtinModules, ...Object.keys(pkg.dependencies)]

export default {
  input: 'src/main.js',
  output: {
    banner: '#!/usr/bin/env node',
    file: pkg.bin,
    format: 'cjs'
  },
  external,
  plugins: [
    json(),
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    executable()
  ]
}
