'use strict';

const assert = require('assert');
const config = require('../config/config');
const logger = require('../util/log').logger('socket.io');

module.exports = (server, options) => {

  const io = require('socket.io')(server);

  io.on('connection', (socket) => {

    socket.on('sensor', (data) => {
      options.repository.insert('sensor', data);
    });

    socket.on('rollback', (data) => {
      logger.info(`rollback PIN: ${data.pin}`);
      options.repository.deleteMany('sensor', {
        'pin': data.pin,
        'sampleID': data.sampleID
      })
        .then((deletedCount) => {
          logger.info(`rollback complete, deleted counts: ${deletedCount}`);
          socket.emit('rollback-complete');
        });
    });

    socket.on('log-complete', (data) => {
      logger.info(`[User: ${data.username}, sampleID: ${data.sampleID}]: Log completed. `);
      options.repository.insert('stat', data);
    });

  });
};
