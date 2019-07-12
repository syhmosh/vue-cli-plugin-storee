const { readdirSync, statSync, writeFileSync } = require('fs');
const { join } = require('path');
const { exec } = require('child_process');
const ejs = require('ejs');

const context = join(process.cwd(), 'src');

module.exports = class StoreePlugin {
  apply(compiler) {
    compiler.hooks.afterEnvironment.tap('StoreePlugin', () => {
      const files = readStore(context);
      ejs.renderFile(join(__dirname, 'template.ejs'), { files: files }, (err, str) => {
        if (err !== null) {
          throw new Error(
            `ejs compile error: ${err}`
          )
        }
        writeFileSync(join(context, 'views/.storee/index.js'), str);
      });
    });
  }
};

function readStore(src) {
  const files = readdirSync(src);
  const isStore = src.indexOf('/store') > -1;

  let stores = [];
  files.forEach(file => {
    var fullPath = join(src, file);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      return stores = stores.concat(readStore(join(src, file)));
    }
    if(isStore) {
      stores.push({
        name: file.replace('.js', ''),
        path: fullPath
      });
    }
  });

  return stores;
}