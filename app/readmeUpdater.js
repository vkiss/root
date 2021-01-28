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
const changelogFile = path.resolve( root, "README.md" );
const distIndex = path.resolve( `${root}/dist`, "index.html" );

/**
 * -----------------------------
 * Functions
 * -----------------------------
 */

const getFilesizeInBytes = ( filename ) => {
  const stats = fs.statSync( filename );
  const fileSizeInBytes = stats.size;
  return fileSizeInBytes / 1000 + " KB";
};

/**
 * -----------------------------
 * Content
 * -----------------------------
 */

const READMEcontent = `<img src="rootFiles/favicon.png" width="256px" />

Tamanho do arquivo index.html final: **${getFilesizeInBytes( distIndex )}**`;

/**
 * -----------------------------
 * Write Function
 * -----------------------------
 */

const writeREADME = ( writeThis ) => {
  fs.writeFileSync( changelogFile , writeThis );

  info( chalk.underline.green( "> readme.md updated" ) );
};

/**
 * ----------------------------------------------------------
 */

const runScript = () => {
  info( chalk.cyan( "> updating readme.md" ) );
  writeREADME( READMEcontent );
};

runScript();

/* eslint-enable array-callback-return */
