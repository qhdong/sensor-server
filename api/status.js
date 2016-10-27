'use strict';

module.exports = (app, options) => {
  app.get('/status', (req, res, next) => {
    options.repository.getStatus().then((status) => {
      res.json(status);
    }).catch(next);
  });
};
