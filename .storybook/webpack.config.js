const path = require('path')

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.resolve.alias = {
    src: path.join(path.resolve(__dirname, '../'), 'src'),
    lib: path.join(path.resolve(__dirname, '../'), 'lib'),
    assets: path.join(path.resolve(__dirname, '../'), 'assets'),
  }

  return defaultConfig
}
