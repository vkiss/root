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
const webpackFile = path.resolve( "./", "webpack.config.js" );

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
  info( chalk.cyan( "> app size " ) + chalk.bgMagenta.bold.black( ` ${currentSize}kb ` ) );

  fs.readFile( webpackFile, "utf8", function ( err,data ) {
    if ( err ) {
      return info( chalk.red( err ) );
    }

    const result = data.replace( /FILEWEIGHT: \"(\d|.)+\"/m, `FILEWEIGHT: "${currentSize}"` );

    fs.writeFile( webpackFile, result, "utf8", function ( nerr ) {
      if ( nerr ) return info( chalk.red( nerr ) );
    } );
  } );
};

runScript();

/* eslint-enable array-callback-return */
