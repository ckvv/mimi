const fs = require('node:fs');
const path = require('node:path');
const glob = require('glob');
const { decipherPipe, getCipherKey, parseDecipherPath } = require('./utils.js');

function mountDigest(program) {
  program.command('digest')
    .description('digest files')
    .argument('[<input>:<output>]', '<input dir>:<output dir>')
    .option('-k, --key <string>', 'key')
    .option('-d, --del', 'delete original file after digest files')
    .action((str = '', options) => {
      let [input, output] = str.split(':');
      input = input || './';
      output = output || input;

      const { key, del } = options;
      const cipherKey = getCipherKey(key);
      glob(`${input}/**/*`, {
        nodir: true,
      }, (e, files) => {
        if (e) {
          console.log(e);
          return;
        }
        files.forEach((file) => {
          const pathInfo = parseDecipherPath(path.resolve(output, file), cipherKey);
          fs.mkdirSync(pathInfo.dir, { recursive: true });
          const stream = decipherPipe(fs.createReadStream(file), cipherKey).pipe(fs.createWriteStream(`${pathInfo.dir}/${pathInfo._base}`));
          if (del) {
            stream.on('finish', () => {
              fs.unlinkSync(file);
            });
          }
        });
      });
    });
}

module.exports = {
  mountDigest,
};

