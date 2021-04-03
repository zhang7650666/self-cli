#!/usr/bin/env node
const program = require('commander');
const packageJson = require('./package.json')
const helpOptions = require('./lib/core/help')
const createCommands = require('./lib/core/create')

program.version(packageJson.version);
// 帮助和可选信息
helpOptions();
createCommands()
program.parse(process.argv);

