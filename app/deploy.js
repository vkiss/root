const FtpDeploy = require( "ftp-deploy" );
const ftpDeploy = new FtpDeploy();
const config = require( "../../vkiss-secrets/deploy/vkiss-root" );

// use with promises
if ( config.publishEnabled ) {
  ftpDeploy
    .deploy( config )
    .then( res => console.log( "finished:", res ) )
    .catch( err => console.log( err ) );
}
