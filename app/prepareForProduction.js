/**
 * -----------------------------
 * Requires
 * -----------------------------
 */

const fs = require( "fs" );
const chalk = require( "chalk" );
const { info } = console;
const path = require( "path" );

/**
 * -----------------------------
 * Directories & Files
 * -----------------------------
 */

const indexFile = path.resolve( "./dist", "index.html" );

/**
 * -----------------------------
 * Utils
 * -----------------------------
 */

const uniqueArray = ( arr ) => {
  return arr.reduce( ( unique, o ) => {
    if( !unique.some( obj => obj === o ) ) {
      unique.push( o );
    }
    return unique;
  },[] );
};

Array.prototype.remove = function() {
  var what, a = arguments, L = a.length, ax;
  while ( L && this.length ) {
    what = a[--L];
    while ( ( ax = this.indexOf( what ) ) !== -1 ) {
      this.splice( ax, 1 );
    }
  }
  return this;
};

/**
 * -----------------------------
 * Minify HTML ClassNames
 * -----------------------------
 */

const generateRandomIdsArray = () => {
  const finalArray = [];
  const allLetter = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz".split( "" );

  for ( const letter of allLetter ) {
    finalArray.push( letter );
    finalArray.push( letter + letter );
  }

  return finalArray;
};

fs.readFile( indexFile, "utf8", function ( err, data ) {
  if ( err ) {
    return info( chalk.red( err ) );
  }

  const aditionalClassesAndIds = [
    "#email-link-desktop",
    "#phone-link-desktop",
    "#second-app",
    "#canvas-element",
    ".context-menu-secondary-item",
    ".context-menu-link-sign"
  ];

  const allClassesFromIndex = uniqueArray( data.match( /((\.|\#){1}([a-z]|[A-Z]|-|_){1,})(?={|\$|( ({|strong|\.|\,)))/g ) );

  for ( const aditionalClassOrID of aditionalClassesAndIds ) {
    allClassesFromIndex.push( aditionalClassOrID );
  }

  const allClasses = allClassesFromIndex.sort( ( a, b ) => { return b.length - a.length; } );
  const randomIDs = generateRandomIdsArray();
  const overbooked = allClasses.length > randomIDs.length;

  info(
    chalk.cyan( "> classes e ids usados " )
    + chalk[( overbooked ? "bgRed" : "bgGreen" )].bold.black( ` ${allClasses.length} ` )
    + chalk.cyan( " / " )
    + chalk.bgMagenta.bold.black( ` ${randomIDs.length} ` )
  );

  if ( overbooked ) {
    info( chalk.black.bgRed( "> ERROR: Existem mais classes nesse HTML do que letras em dois alfabetos." ) );
    info( chalk.red( "> Dá uma revisada nesse DOM, ou inclui mais simbolos na const randomIDs:" ) );
    info( chalk.red( "> app/prepareForProduction.js:69" ) );
    throw new Error( "> overbook-kill" );
  }

  let newData = data;

  for ( let i = 0; i < allClasses.length; i++ ) {
    const cssDeclaration = allClasses[i].replace( ".", "" ).replace( "#", "" );
    const thisCSSRegex = new RegExp( cssDeclaration, "g" );
    const thisID = randomIDs[i];

    newData = newData.replace( thisCSSRegex, thisID );
  }

  fs.writeFile( indexFile, newData, "utf8", function ( nerr ) {
    if ( nerr ) return info( chalk.red( nerr ) );
    info( chalk.gray( "> Prepare for Production:" ) + chalk.green( " Minify classes and ids" ) );
  } );
} );

