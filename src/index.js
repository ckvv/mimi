#!/usr/bin/env node

const { program } = require('commander');
const config = require('../package.json');
const { mountEncrypt } = require('./encrypt.js');
const { mountDigest } = require('./digest.js');
const { mountServer } = require('./server.js');

program
  .name(config.name)
  .description(config.description)
  .version(config.version);

mountEncrypt(program);
mountDigest(program);
mountServer(program);

program.parse();

process.on('uncaughtException', (e) => {
  console.log(e);
});
