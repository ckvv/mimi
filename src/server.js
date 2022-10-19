const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const glob = require('glob');
const mime = require('mime-types');
const { getCipherKey, decipherPipe, parseCipherPath, parseDecipherPath } = require('./utils.js');

const rootPath = process.cwd();

function mountServer(program) {
  program.command('server')
    .description('digest files server')
    .argument('[dir]', 'public dir')
    .option('-k, --key <type>', 'key')
    .option('-p, --port <number>', 'port number')
    .action((str = './', options) => {
      const { port = 8080, key } = options;
      const cipherKey = getCipherKey(key);

      const server = http.createServer((req, res) => {
        if (req.url === '/') {
          glob(`${str}/**/*`, {
            nodir: true,
          }, (e, files) => {
            if (e) {
              console.log(e);
              return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>MIMI Server</title>
            </head>
            <body>
              ${files.map((file) => {
                try {
                  const pathInfo = parseDecipherPath(file, cipherKey);
                  const newPath = `${pathInfo.dir}/${pathInfo._base}`;
                  return `<a href="${newPath}" target="_blank" style="display: block;">${newPath}</a>`;
                } catch (error) {
                  console.log('File encrypt key error:', file);
                  return `<a href="${file}" target="_blank" style="display: block; text-decoration:line-through; color: gray;">${file}</a>`;
                }
              }).join('')}
            </body>
            </html>`);
          });
        } else {
          const url = decodeURI(req.url || '');
          res.statusCode = 200;
          res.setHeader('Content-Type', `${mime.lookup(url)}; charset=utf-8`);
          res.setHeader('Content-Disposition', 'inline');

          const filePath = path.join(rootPath, url);
          const pathInfo = parseCipherPath(filePath, cipherKey);
          const newPath = `${pathInfo.dir}/${pathInfo._base}`;

          const readStream = fs.createReadStream(`${newPath}`);
          readStream.on('open', () => {
            decipherPipe(readStream, cipherKey).pipe(res);
          });
          readStream.on('error', () => {
            console.log('File encrypt key error:', filePath);
            fs.createReadStream(`${filePath}`).pipe(res);
          });
        }
      });
      server.listen(port, () => {
        console.log(`Running at http://localhost:${port}`);
      });
    });
}

module.exports = {
  mountServer,
};

