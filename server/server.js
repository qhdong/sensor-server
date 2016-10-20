// server.js

const express = require('express');
const morgan = require('morgan');

module.exports.start = (options) => {
  return new Promise((resolve, reject) => {
    if (!options.port) throw new Error('A server must be started with a port.');

    // Create the app
    var app = express();
    app.use(morgan('dev'));

    // Add the APIs
    require('../api/pin')(app, options);

    var server = app.listen(options.port, () => {
      resolve(server);
    });
  });
};
