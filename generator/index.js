module.exports = (api, options = {}) => {

  api.injectImports(api.entryFile, `import store from './views/.storee'`);

  api.extendPackage({
    dependencies: {
      'vuex': '^3.1.0'
    }
  });

  api.render('./template', {
    doesCompile: api.hasPlugin('babel') || api.hasPlugin('typescript')
  });

  if (api.invoking) {
    if (api.hasPlugin('typescript')) {
      /* eslint-disable-next-line node/no-extraneous-require */
      const convertFiles = require('@vue/cli-plugin-typescript/generator/convert');
      convertFiles(api)
    }
  }
};
