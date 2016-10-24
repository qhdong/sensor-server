const repository = require('./repository/repository');
const server = require('./server/server');
const config = require('./config/config');

process.on('uncaughtException', function (err) {
  console.error('Unhandled Exception', err);
});

process.on('unhandledRejection', function (err, promise) {
  console.error('Unhandled Rejection', err);
});

repository.connect(config.db).then((repo) => {
  console.log('Connected. Starting server...');

  return server.start({
    port: config.port,
    repository: repo
  });
}).then((app) => {
  console.log('Server started successfully, running on port ' + config.port + '.');
});
