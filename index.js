module.exports = (api, options) => {
  api.chainWebpack(webpackConfig => {
    webpackConfig
      .plugin('storee')
      .use(require('./lib/StoreePlugin'))
  })
};