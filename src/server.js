const http = require('node:http');
const fs = require('node:fs');
const handler = require('serve-handler');
const { getCipherKey, parseCipherPath, parseDecipherPath, decipherPipe } = require('./utils.js');

function mountServer(program) {
  program.command('server')
    .description('解密文件服务')
    .argument('[dir]', 'public dir')
    .option('-k, --key <type>', '加密密钥')
    .option('-p, --port <number>', '端口号')
    .action((str = './', options) => {
      const { port = 8080, key } = options;
      const cipherKey = getCipherKey(key);

      const server = http.createServer((request, response) => {
        return handler(request, response, {
          public: str,
        }, {
          lstat: (path, ...args) => {
            if (`${path}`.endsWith('html') || `${path}`.endsWith('/'))
              return fs.lstatSync(path);

            const pathInfo = parseCipherPath(path, cipherKey);
            return fs.lstatSync(`${pathInfo.dir}/${pathInfo._base}`, ...args);
          },
          realpath: (path, ...args) => {
            const pathInfo = parseCipherPath(path, cipherKey);
            return fs.realpathSync(`${pathInfo.dir}/${pathInfo._base}`, ...args);
          },
          createReadStream: (path, ...args) => {
            const pathInfo = parseCipherPath(path, cipherKey);
            return decipherPipe(fs.createReadStream(`${pathInfo.dir}/${pathInfo._base}`, ...args), cipherKey);
          },
          readdir: (path, ...args) => {
            return fs.readdirSync(path, ...args).map((file) => {
              const pathInfo = parseDecipherPath(file, cipherKey);
              return pathInfo._base;
            });
          },
        });
      });
      server.listen(port, () => {
        console.log(`Running at http://localhost:${port}`);
      });
    });
}

module.exports = {
  mountServer,
};

