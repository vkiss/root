const FtpDeploy = require( "ftp-deploy" );
const ftpDeploy = new FtpDeploy();
const deployConfig = require( "./deployConfig" );

const config = {
  user: deployConfig.ftp.user,
  password: deployConfig.ftp.pwd,
  host: deployConfig.ftp.host,
  port: deployConfig.ftp.port,
  localRoot: deployConfig.localRoot,
  remoteRoot: deployConfig.remoteRoot,
  include: deployConfig.upload,
  exclude: deployConfig.ignore,
  deleteRemote: deployConfig.cleanServer,
  forcePasv: deployConfig.forcePasv
};

// use with promises
if ( deployConfig.publishEnabled ) {
  ftpDeploy
    .deploy( config )
    .then( res => console.log( "finished:", res ) )
    .catch( err => console.log( err ) );
}
