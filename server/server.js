// server.js

const express = require('express');
const log4js = require('../util/log');

module.exports.start = (options) => {
  return new Promise((resolve, reject) => {
    if (!options.port) throw new Error('A server must be started with a port.');

    // Create the app
    var app = express();
    log4js.configure();
    app.use(log4js.useLog());

    // Add the APIs
    require('../api/pin')(app, options);
    require('../api/status')(app, options);

    var server = app.listen(options.port, () => {
      require('../api/websocket')(server, options);
      resolve(server);
    });
  });
};
