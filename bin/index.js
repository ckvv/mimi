#!/usr/bin/env node

const { program } = require('commander');
const config = require('../package.json');
const { mountEncrypt } = require('../src/encrypt.js');
const { mountDigest } = require('../src/digest.js');
const { mountServer } = require('../src/server.js');

program
  .name(config.name)
  .description(config.description)
  .version(config.version, '-v, --version');

mountEncrypt(program);
mountDigest(program);
mountServer(program);

program.on('command:*', () => {
  console.log(`Invalid command: ${program.args.join(' ')}\nSee --help for a list of available commands.`);
  process.exit(1);
});

program.parse();

process.on('uncaughtException', (e) => {
  console.log(e);
  process.exit(1);
});

