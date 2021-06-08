module.exports = {
  publishEnabled: true, // enable/disable publish task
  user: "string",
  password: "string",
  host: "string",
  port: 21,
  localRoot: "string",
  remoteRoot: "string",
  include: [],
  exclude: [],
  deleteRemote: false, // delete ALL existing files at destination before uploading, if true
  forcePasv: true // Passive mode is forced (EPSV command is not sent)
};
