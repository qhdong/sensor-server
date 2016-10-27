'use strict';

module.exports = (app, options) => {
  app.get('/status', (req, res, next) => {
    var pinsCount = 0;
    options.repository.getPins().then((pins) => {
      pinsCount = pins.length;
    });

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
};
