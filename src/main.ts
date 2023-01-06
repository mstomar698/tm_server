#!/usr/bin/env node

import { cwd as getPwd, exit } from 'node:process';
import path from 'node:path';
import chalk from 'chalk';
import boxen from 'boxen';
import manifest from '../package.json';
import { parseArguments, getHelpText } from './utils/cli.js';
import { logger } from './utils/logger.js';
import { resolve } from './utils/promise.js';
import type { DisplayValue } from './types';

const message = chalk.green('Welcome 🙌 to "Template Master"');

// Parse the options passed by the user.
const [parseError, args] = await resolve(parseArguments());
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (parseError || !args) {
  logger.error(parseError.message);
  exit(0);
}

if (args['--help']) {
  logger.log(getHelpText());
  registerClose(0);
}

if (args['--version']) {
  logger.log(manifest.version);
  registerClose(0);
}

if (args['--long']) {
  console(message);
  registerClose(0);
}

// Path of the directory.
const presentDirectory = getPwd();
const directoryToServe = args._[0] ? path.resolve(args._[0]) : presentDirectory;

// Function to close or exit the terminal
function registerClose(x: number) {
  if (x === 0) {
    logger.log();
    logger.info('Gracefully shutting down. Please wait...');
    exit(1);
  } else {
    logger.log();
    logger.warn('Force-closing...');
    exit(0);
  }
}

// Function to print message on console
function console(Value: DisplayValue) {
  const consoleDisplay = logger.log(
    boxen(Value, {
      padding: 1,
      borderColor: 'green',
      margin: 1,
    }),
  );
  return consoleDisplay;
}
console(message);
console(presentDirectory);
console(directoryToServe);
