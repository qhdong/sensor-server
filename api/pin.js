'use strict';

module.exports = (app, options) => {
  app.get('/pin', (req, res, next) => {
    options.repository.getPins().then((pins) => {
      res.status(200).send(pins);
    }).catch(next);
  });
};
