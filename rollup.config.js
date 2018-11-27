import alias from 'rollup-plugin-alias'
import executable from 'rollup-plugin-executable'
import json from 'rollup-plugin-json'
import pkg from './package.json'
import resolve from 'rollup-plugin-node-resolve'
import { builtinModules } from 'module'

const external = [
  ...builtinModules,
  ...Object.keys(pkg.dependencies)
]

export default [
  {
    input: 'src/lib.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    external,
    plugins: [
      resolve()
    ]
  },
  {
    input: 'src/main.js',
    output: {
      banner: '#!/usr/bin/env node',
      file: pkg.bin,
      format: 'cjs'
    },
    external,
    plugins: [
      json(),
      alias({
        [pkg.name]: pkg.module
      }),
      executable(),
    ]
  }
]
