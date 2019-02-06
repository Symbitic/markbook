module.exports = function (api) {
  api.cache.using(() => process.env.NODE_ENV)

  const modules = api.env() === 'test' ? 'commonjs' : false

  return {
    presets: [
      [
        '@babel/env',
        {
          modules,
          targets: {
            node: '8'
          }
        }
      ]
    ],
    plugins: [['module-resolver', { root: './src' }]],
    comments: false
  }
}
