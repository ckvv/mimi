const fs = require('node:fs');
const path = require('node:path');
const glob = require('glob');
const { cipherPipe, getCipherKey, parseCipherPath } = require('./utils.js');

function mountEncrypt(program) {
  program.command('encrypt')
    .description('encrypt files')
    .argument('[<input>:<output>]', '<input dir>:<output dir>')
    .option('-k, --key <string>', 'key')
    .option('-d, --del', 'delete original file after encrypt files')
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
          const pathInfo = parseCipherPath(path.resolve(output, file), cipherKey);
          fs.mkdirSync(pathInfo.dir, { recursive: true });
          const stream = cipherPipe(fs.createReadStream(file), cipherKey).pipe(fs.createWriteStream(`${pathInfo.dir}/${pathInfo._base}`));
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
  mountEncrypt,
};

