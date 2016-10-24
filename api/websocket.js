'use strict';

const assert = require('assert');
const config = require('../config/config');


module.exports = (server, options) => {
  const io = require('socket.io')(server);

  io.on('connection', (socket) => {

    socket.on('sensor', (data) => {
      options.repository.insert('sensor', data);
      console.log(data);
    });

    socket.on('rollback', (data) => {
      console.log('rollback PIN: ', data.pin);
      options.repository.deleteMany('sensor', {
        'pin': data.pin,
        'sampleID': data.sampleID
      })
        .then((deletedCount) => {
          console.log('rollback complete, deleted counts: ', deletedCount);
          socket.emit('rollback-complete');
        });
    });

  });
};
