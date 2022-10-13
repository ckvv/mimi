const path = require('node:path');
const { Buffer } = require('node:buffer');
const { scryptSync, createDecipheriv, createCipheriv } = require('node:crypto');

const algorithm = 'aes-256-cbc';
const iv = Buffer.alloc(16, 0);

const cipherPipe = (input, key) => input.pipe(createCipheriv(algorithm, key, iv));
const decipherPipe = (input, key) => {
  const cipher = createDecipheriv(algorithm, key, iv);
  return input.pipe(cipher);
};

const getCipherKey = (key = '') => scryptSync(key, 'salt', 32);

const cipher = (text, key) => {
  const cipher = createCipheriv(algorithm, key, iv);
  const ciphered = cipher.update(text);
  return Buffer.concat([ciphered, cipher.final()]).toString('hex');
};

const decipher = (text, key) => {
  const decipher = createDecipheriv(algorithm, key, iv);
  const deciphered = decipher.update(Buffer.from(text, 'hex'));
  return Buffer.concat([deciphered, decipher.final()]).toString();
};

const parseCipherPath = (input, key) => {
  const pathInfo = path.parse(input);
  const _base = `${cipher(pathInfo.name, key)}${pathInfo.ext}`;
  return {
    _base,
    ...pathInfo,
  };
};

const parseDecipherPath = (input, key) => {
  const pathInfo = path.parse(input);
  const _base = `${decipher(pathInfo.name, key)}${pathInfo.ext}`;
  return {
    _base,
    ...pathInfo,
  };
};

module.exports = {
  getCipherKey,
  cipher,
  cipherPipe,
  decipher,
  decipherPipe,
  parseCipherPath,
  parseDecipherPath,
};
