import { env } from 'node:process';
// import { spawn } from 'node:child_process';
import shell from 'shelljs';
import chalk from 'chalk';
import parseArgv from 'arg';
import checkForUpdate from 'update-check';
import chalkTemplate from 'chalk-template';
import { resolve } from './promise.js';
import { logger } from './logger.js';
import { options } from './options.js';
import type { Args, Arguments, Path } from '../types.js';

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

const helpText = chalkTemplate`
  {bold.cyan tm_server} - server generating library

  {bold USAGE}

    {bold $} {cyan tm_server} --help
    {bold $} {cyan tm_server} --version
    {bold $} {cyan tm_server} --static
    {bold $} {cyan tm_server} --express
    {bold $} {cyan tm_server} --flask
    {bold $} {cyan tm_server} --java
    {bold $} {cyan tm_server} --go
    {bold $} {cyan tm_server} --rust
    {bold $} {cyan tm_server} --php
    
  {bold OPTIONS}

    -h, --help                          Shows this help message

    -v, --version                       Displays the current version of serve
    
    -e, --express                       install and creates express server

    -s, --static                        install and creates static http server

    -f, --flask                         install and creates flask server

    -j, --java                          install and creates java server

    -g, --go                            install and creates go server

    -r, --rust                          install and creates rust server

    -p, --php                           install and creates php server

`;

/**
 * Parses the program's `process.argv` and returns the options and arguments.
 *
 * @returns The parsed options and arguments.
 */
export const parseArguments = (): Arguments => parseArgv(options);

export const script = (
  argument1: Path,
  argument2: Args,
  argument3: Args,
  argument4: Args,
) => {
  shell
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    .cat(`${argument1}/npm/node_modules/tm_server/build/servers/${argument2}`)
    .to(`${argument3}`);
  logger.log(`${argument4} has been created successfully,👍`);
};

/**
 * Returns the help text.
 *
 * @returns The help text shown when the `--help` option is used.
 */
export const getHelpText = (): string => helpText;
