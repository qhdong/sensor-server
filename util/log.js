'use strict';

const path = require('path');
const log4js = require('log4js');

exports.configure = function () {
  log4js.configure(path.join(__dirname, 'log4js.json'));
};

exports.logger = function (name) {
  let dateFileLog = log4js.getLogger(name);
  dateFileLog.setLevel(log4js.levels.INFO);
  return dateFileLog;
};

exports.useLog = function () {
  return log4js.connectLogger(log4js.getLogger('app'), {level: log4js.levels.INFO});
};
