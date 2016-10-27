'use strict';

module.exports = (app, options) => {
  app.get('/status', (req, res, next) => {
    options.repository.getPins().then((pins) => {
      var pinsCount = pins.length;
      options.repository.getStatus().then((status) => {
        if (req.query.callback) {
          res.jsonp({
            status: status,
            pinsCount: pinsCount
          });
        } else {
          res.json({
            status: status,
            pinsCount: pinsCount
          });
        }
      }).catch(next);
    });
  });
};
