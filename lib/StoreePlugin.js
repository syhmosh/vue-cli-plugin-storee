const { writeFileSync, existsSync, mkdirSync } = require('fs');
const { join } = require('path');
const glob = require('glob');
const ejs = require('ejs');

const context = join(process.cwd(), 'src');
const root = join(context, 'views/\.storee');
const defaults = {
  context,
  root
};

module.exports = class StoreePlugin {
  constructor (options = {}) {
    this.options = Object.assign({ }, defaults, options);
  }

  apply(compiler) {
    compiler.hooks.afterEnvironment.tap('StoreePlugin', () => {
      const { context, root } = this.options;
      if (!existsSync(root)) {
        mkdirSync(root, { recursive: true });
      }

      const files = glob.sync(join(context, '**/store/*.js'));

      const stores =  files.map(file => ({
        name: file.match(/\/store\/(\w*)\.js/)[1],
        path: file
      }));

      ejs.renderFile(join(__dirname, 'template.ejs'), { files: stores }, (err, str) => {
        if (err !== null) {
          throw new Error(
            `ejs compile error: ${err}`
          )
        }
        writeFileSync(join(root, 'index.js'), str);
      });
    });
  }
};