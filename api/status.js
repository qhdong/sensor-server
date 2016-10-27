'use strict';

module.exports = (app, options) => {
  app.get('/status', (req, res, next) => {
    options.repository.getStatus().then((status) => {
      if (req.query.callback) {
        res.jsonp(status);
      } else {
        res.json(status);
      }
    }).catch(next);
  });
};
