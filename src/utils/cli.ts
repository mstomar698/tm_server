// CLI-related utility functions.

// import { parse as parseUrl } from 'node:url';
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
 * Parse and return the endpoints from the given string.
 *
 * @param uriOrPort - The endpoint to listen on.
 * @returns A list of parsed endpoints.
 */
// export const parseEndpoint = (uriOrPort: string): ParsedEndpoint => {
//   // If the endpoint is a port number, return it as is.
//   if (!isNaN(Number(uriOrPort))) return { port: Number(uriOrPort) };

//   // Cast it as a string, since we know for sure it is not a number.
//   const endpoint = uriOrPort;

//   // We cannot use `new URL` here, otherwise it will not
//   // parse the host properly and it would drop support for IPv6.
//   const url = parseUrl(endpoint);

//   switch (url.protocol) {
//     case 'pipe:': {
//       const pipe = endpoint.replace(/^pipe:/, '');
//       if (!pipe.startsWith('\\\\.\\'))
//         throw new Error(`Invalid Windows named pipe endpoint: ${endpoint}`);

//       return { host: pipe };
//     }
//     case 'unix:':
//       if (!url.pathname)
//         throw new Error(`Invalid UNIX domain socket endpoint: ${endpoint}`);

//       return { host: url.pathname };
//     case 'tcp:':
//       url.port = url.port ?? '3000';
//       url.hostname = url.hostname ?? 'localhost';

//       return {
//         port: Number(url.port),
//         host: url.hostname,
//       };
//     default:
//       throw new Error(
//         `Unknown --listen endpoint scheme (protocol): ${
//           url.protocol ?? 'undefined'
//         }`,
//       );
//   }
// };

// The options the CLI accepts, and how to parse them.

const options = {
  '--help': Boolean,
  '--version': Boolean,

  // A list of aliases for the above options.
  '-h': '--help',
  '-v': '--version',
};

/**
 * Parses the program's `process.argv` and returns the options and arguments.
 *
 * @returns The parsed options and arguments.
 */
export const parseArguments = (): Arguments => parseArgv(options);

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
    `The latest version of \`serve\` is ${update.latest}`,
  );
};
