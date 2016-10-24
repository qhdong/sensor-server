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
