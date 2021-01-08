
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
 * Variables
 * -----------------------------
 */


const cliArgs = process.argv.slice( 2 );

/**
 * -----------------------------
 * Directories & Files
 * -----------------------------
 */

const webpackFile = path.resolve( "./", "webpack.config.js" );

/**
 * Validate nonsense
 */

if ( cliArgs.includes( "dev" ) && cliArgs.includes( "prod" ) ) {
  info( chalk.red( "Go home, you're drunk" ) );
  return;
}

/**
 * -----------------------------
 * Toggle HtmlWebpackInlineSourcePlugin status
 * -----------------------------
 */

fs.readFile( webpackFile, "utf8", function ( err,data ) {
  if ( err ) {
    return info( chalk.red( err ) );
  }

  let result;

  if ( cliArgs.includes( "dev" ) ) {
    result = data.replace( /^( |)+new HtmlWebpackInlineSourcePlugin\( HtmlWebpackPlugin \),/m, "    // new HtmlWebpackInlineSourcePlugin( HtmlWebpackPlugin )," );
    info( chalk.gray( "Webpack Settings changed to ->" ) + chalk.black.bgGreen( ":: LOCAL ::" ) );
  } else if ( cliArgs.includes( "prod" ) ) {
    result = data.replace( /( |)+\/\/ new HtmlWebpackInlineSourcePlugin\( HtmlWebpackPlugin \),/m, "    new HtmlWebpackInlineSourcePlugin( HtmlWebpackPlugin )," );
    info( chalk.gray( "Webpack Settings changed to " ) + chalk.black.bgGreen( ":: PRODUCTION ::" ) );
  } else {
    info( chalk.red( "Go home, you're drunk" ) );
  }



  fs.writeFile( webpackFile, result, "utf8", function ( nerr ) {
    if ( nerr ) return info( chalk.red( nerr ) );
  } );
} );
