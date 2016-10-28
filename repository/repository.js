'use strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

class Repository {
  constructor(url) {
    this.url = url;
  }

  insert(col, data) {
    MongoClient.connect(this.url, function (err, db) {
      assert.equal(null, err);
      db.collection(col).insertOne(data, function (err, result) {
        assert.equal(null, err);
        assert.equal(1, result.insertedCount);
        db.close();
      });
    });
  }

  deleteMany(col, query) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.url, function (err, db) {
        assert.equal(null, err);
        db.collection(col).deleteMany(query, (err, r) => {
          assert.equal(null, err);
          db.close();
          resolve(r.deletedCount);
        });
      });
    });
  }

  getStatus() {
    return new Promise((resolve, reject) => {
      this.groupBy('status', 'UAParser.browser').then((browser) => {
        this.groupBy('status', 'UAParser.os').then((os) => {
          resolve({
            'browser': browser,
            'os': os
          });
        });
      });
    });
  }

  groupBy(col, field) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.url, function (err, db) {
        assert.equal(null, err);
        db.collection(col).group(
          [field],
          {},
          {'count': 0},
          "function (curr, result) {result.count++}",
          function (err, result) {
            assert.equal(err, null);
            db.close();
            resolve(result);
          }
        );
      });
    });
  }

  getPins() {
    return new Promise((resolve, reject) => {
      var pin;
      MongoClient.connect(this.url, function (err, db) {
        assert.equal(null, err);
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
