// CLI-related utility functions.

import { env } from 'node:process';
import chalk from 'chalk';
import chalkTemplate from 'chalk-template';
import parseArgv from 'arg';
import checkForUpdate from 'update-check';
import { resolve } from './promise.js';
import { logger } from './logger.js';
import type { Arguments } from '../types.js';

// The help text for the CLI.
const helpText = chalkTemplate`
  {bold.cyan tm_server} - server generating library

  {bold USAGE}

    {bold $} {cyan tm_server} --help
    {bold $} {cyan tm_server} --version
    
  {bold OPTIONS}

    --help                              Shows this help message

    -v, --version                       Displays the current version of serve

`;

/**
 * Returns the help text.
 *
 * @returns The help text shown when the `--help` option is used.
 */
export const getHelpText = (): string => helpText;

/**
 * Checks for updates to this package. If an update is available, it brings it
 * to the user's notice by printing a message to the console.
 */
export const checkForUpdates = async (manifest: object): Promise<void> => {
  // Do not check for updates if the `NO_UPDATE_CHECK` variable is set.
  if (env.NO_UPDATE_CHECK) return;

  // Check for a newer version of the package.
  const [error, update] = await resolve(checkForUpdate(manifest));

  // If there is an error, throw it; and if there is no update, return.
  if (error) throw error;
  if (!update) return;

  // If a newer version is available, tell the user.
  logger.log(
    chalk.bgRed.white(' UPDATE '),
    `The latest version of \`tm_server\` is ${update.latest}`,
  );
};

// The options that the CLI accepts.
const options = {
  '--help': Boolean,
  '--version': Boolean,
  '--long': Boolean,

  // A list of aliases for the above options.
  '-h': '--help',
  '-v': '--version',
  '-l': '--long',
};

/**
 * Parses the program's `process.argv` and returns the options and arguments.
 *
 * @returns The parsed options and arguments.
 */
export const parseArguments = (): Arguments => parseArgv(options);
