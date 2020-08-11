module.exports = {
  // enable/disable publish task
  publishEnabled: true, 

  ftp: {
    host: "string",
    port: 21,
    user: "string",
    pwd: "string",
  },

  localRoot: "string",
  remoteRoot: "string",

  upload: [],
  ignore: [],

  // delete ALL existing files at destination before uploading, if true
  cleanServer: false,

  // Passive mode is forced (EPSV command is not sent)
  forcePasv: true,
};
