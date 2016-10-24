'use strict';

module.exports = (app, options) => {
  app.get('/pin', (req, res, next) => {
    options.repository.getPins().then((pins) => {
      if (req.query.callback) {
        res.jsonp({pins: pins});
      } else {
        res.json({pins: pins});
      }
    }).catch(next);
  });
};
