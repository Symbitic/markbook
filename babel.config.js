module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV === 'development')

  return {
    presets: ['@babel/preset-env'],
    comments: false
  }
}
