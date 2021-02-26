/**
 * -----------------------------
 * Requires
 * -----------------------------
 */

/* eslint-disable array-callback-return */

const fs = require( "fs" );
const chalk = require( "chalk" );
const { info } = console;
const path = require( "path" );

/**
 * -----------------------------
 * Directories & Files
 * -----------------------------
 */

const root = "./";
const distIndex = path.resolve( `${root}/dist`, "index.html" );

/**
 * -----------------------------
 * Functions
 * -----------------------------
 */

const getFilesizeInBytes = ( filename ) => {
  const stats = fs.statSync( filename );
  const fileSizeInBytes = stats.size;
  return fileSizeInBytes / 1000;
};

/**
 * ----------------------------------------------------------
 */

const runScript = () => {
  const currentSize = getFilesizeInBytes( distIndex );
  info( chalk.cyan( "> app size " ) + chalk.bgMagenta.bold( ` ${currentSize}kb ` ) );
};

runScript();

/* eslint-enable array-callback-return */
