#!/usr/bin/env node

import { exit } from 'node:process';
import chalk from 'chalk';
import boxen from 'boxen';
import manifest from '../package.json';
import { parseArguments, script, getHelpText, npmInsatallation, otherInstallations } from './utils/cli.js';
import { logger } from './utils/logger.js';
import { resolve } from './utils/promise.js';
import type { Args, DisplayValue, Path } from './types';

// Welcome message on random call
const message = chalk.green('Welcome 🙌 to "Template Master"');

// Parse the options passed by the user.
const [parseError, args] = await resolve(parseArguments());
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (parseError || !args) {
  logger.error(parseError.message);
  exit(0);
}

// npm directory file location
const MainPath: Path = process.env.APPDATA;

if (args['--help']) {
  logger.log(getHelpText());
  registerClose(0);
}

if (args['--version']) {
  logger.log(manifest.version);
  registerClose(0);
}

if (args['--express']) {
  const passedFile: Args = 'server_express.js';
  const resultFile: Args = 'server.js';
  const fileCreated: Args = 'Express Server';
  npmInsatallation('express', '')
  script(MainPath, passedFile, resultFile, fileCreated);
  registerClose(0);
}

if (args['--static']) {
  const passedFile: Args = 'server_http.js';
  const resultFile: Args = 'index.js';
  const fileCreated: Args = 'Static HTTP Server';
  script(MainPath, passedFile, resultFile, fileCreated);
  registerClose(0);
}

if (args['--flask']) {
  const passedFile: Args = 'server_flask.py';
  const resultFile: Args = 'server.py';
  const fileCreated: Args = 'Flask Server';
  otherInstallations('pip', 'install', 'virtualenv')
  otherInstallations('virtualenv', 'venv', '')
  otherInstallations('pip', 'install', 'flask')
  script(MainPath, passedFile, resultFile, fileCreated);
  registerClose(0);
}

if (args['--java']) {
  const passedFile: Args = 'server_java.java';
  const resultFile: Args = 'MyServer.java';
  const fileCreated: Args = 'Java Server';
  script(MainPath, passedFile, resultFile, fileCreated);
  registerClose(0);
}

if (args['--go']) {
  const passedFile: Args = 'server_go.go';
  const resultFile: Args = 'server.go';
  const fileCreated: Args = 'GO Server';
  otherInstallations('git', 'init', '')
  otherInstallations('go', 'mod', 'init')
  script(MainPath, passedFile, resultFile, fileCreated);
  registerClose(0);
}

if (args['--rust']) {
  const passedFile: Args = 'server_rust.rs';
  const resultFile: Args = 'server.rs';
  const fileCreated: Args = 'Rust Server';
  // Dedicated file structure use at your own risk
  script(MainPath, passedFile, resultFile, fileCreated);
  registerClose(0);
}

if (args['--php']) {
  const passedFile: Args = 'server_php.php';
  const resultFile: Args = 'server.php';
  const fileCreated: Args = 'PHP Server';
  script(MainPath, passedFile, resultFile, fileCreated);
  registerClose(0);
}

// Function to close or exit the terminal
function registerClose(x: number) {
  if (x === 0) {
    logger.info('Gracefully shutting down. Please wait...');
    exit(1);
  } else {
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
