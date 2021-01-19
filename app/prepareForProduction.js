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

fs.readFile( indexFile, "utf8", function ( err, data ) {
  if ( err ) {
    return info( chalk.red( err ) );
  }

  const aditionalClassesAndIds = [
    "#email-link-desktop",
    "#phone-link-desktop"
  ];

  const allClassesFromIndex = uniqueArray( data.match( /((\.|\#){1}([a-z]|[A-Z]|-|_){1,})(?={|\$|( ({|strong|\.|\,)))/g ) );

  for ( let i = 0; i < aditionalClassesAndIds.length; i++ ) {
    allClassesFromIndex.push( aditionalClassesAndIds[i] );
  }

  const allClasses = allClassesFromIndex.sort( ( a, b ) => { return b.length - a.length; } );

  const randomIDs = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split( "" );

  if ( allClasses.length > randomIDs.length ) {
    info( chalk.black.bgRed( "Existem mais classes nesse HTML do que letras em dois alfabetos." ) );
    info( chalk.red( "Dá uma revisada nesse DOM, ou inclui mais simbolos na const randomIDs" ) );
    return;
  }

  let newData = data;

  for ( let i = 0; i < allClasses.length; i++ ) {
    const cssDeclaration = allClasses[i].replace( ".", "" ).replace( "#", "" );
    const thisCSSRegex = new RegExp( cssDeclaration, "g" );
    const thisID = randomIDs[Math.floor( Math.random() * randomIDs.length )];

    newData = newData.replace( thisCSSRegex, thisID );
    randomIDs.remove( thisID );
  }

  fs.writeFile( indexFile, newData, "utf8", function ( nerr ) {
    if ( nerr ) return info( chalk.red( nerr ) );
    info( chalk.gray( "> Prepare for Production:" ) + chalk.green( " Minify classes and ids" ) );
  } );
} );

