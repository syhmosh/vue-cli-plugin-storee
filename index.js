module.exports = (api, options) => {
  api.chainWebpack(webpackConfig => {
    const pluginOptions = options.pluginOptions || {};

    webpackConfig
      .plugin('storee')
      .use(require('./lib/StoreePlugin'), [{
        ...(pluginOptions.storee || {})
      }])
  })
};