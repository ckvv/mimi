#!/usr/bin/env node

const { program } = require('commander');
const { mountEncrypt } = require('./encrypt.js');
const { mountDigest } = require('./digest.js');
const { mountServer } = require('./server.js');
const config = require('../package.json');

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
})