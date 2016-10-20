'use strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const co = require('co');

class Repository {
  constructor(url) {
    this.url = url;
  }

  getPins() {
    return new Promise((resolve, reject) => {
      var pin;
      MongoClient.connect(this.url, function (err, db) {
        assert.equal(null, err);
        console.log('Connected correctly to server');
        db.collection('pin').find().toArray(function (err, doc) {
          assert.equal(null, err);
          pin = doc[0].pin;
          db.close();
          resolve(pin);
        });
      });
    });
  }
}

module.exports.connect = (url) => {
  return new Promise((resolve, reject) => {
    resolve(new Repository(url));
  });
};
