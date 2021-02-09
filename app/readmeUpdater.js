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

const currency = require( "currency.js" );

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
  return fileSizeInBytes / 1000;
};

/**
 * -----------------------------
 * Content
 * -----------------------------
 */

const READMEcontent = ( currentData = false ) => {

  const currentSize = getFilesizeInBytes( distIndex );

  if ( !currentData ) {
    return `<img src="rootFiles/favicon.png" width="256px" />

\`\`\`
app size: ${currentSize} kb
\`\`\``;
  }

  const previousSize = parseFloat( currentData.match( /(?<=(app size: ))(\d|\.)*/g )[0] );
  const diffSize = currency( currentSize, { precision: 3 } ).subtract( previousSize ).value;

  const diffText = `(${diffSize === 0 ? "=" : ""}${diffSize !== 0 ? `${diffSize} kb` : ""})`;

  return `<img src="rootFiles/favicon.png" width="256px" />

\`\`\`
app size: ${currentSize} kb ${diffText}
\`\`\``;
};

/**
 * -----------------------------
 * Write Function
 * -----------------------------
 */

const writeResultInFile = ( file, result ) => {
  fs.writeFile( file, result, "utf8", ( nerr ) => {
    if ( nerr ) {
      info( chalk.red( nerr ) );
    }
  } );
};

const writeREADME = () => {
  if ( fs.existsSync( changelogFile ) ) {
    fs.readFile( changelogFile, "utf8", ( err, data ) => {
      if ( err ) {
        info( chalk.red( err ) );
        return;
      }
      writeResultInFile( changelogFile, READMEcontent( data ) );
    } );
  } else {
    writeResultInFile( changelogFile, READMEcontent() );
  }

  info( chalk.underline.green( "> readme.md updated" ) );
};

/**
 * ----------------------------------------------------------
 */

const runScript = () => {
  info( chalk.cyan( "> updating readme.md" ) );
  writeREADME();
};

runScript();

/* eslint-enable array-callback-return */
