const pin = require('./pinGenerator');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const config = require('../config/config');

var N = 50;
var K = 4;
if (process.argv.length == 4) {
  N = parseInt(process.argv[2]);
  K = parseInt(process.argv[3]);
}
var pinArray = pin.getValidPins(N, K);

MongoClient.connect(config.db, function (err, db) {
  assert.equal(null, err);
  console.log('Connected successfully to repository');

  db.collection('pin').drop();
  db.collection('pin').insertOne({time: new Date(), pin: pinArray}, function (err, r) {
    assert.equal(null, err);
    assert.equal(1, r.insertedCount);
    console.log('Successfully insert pins to repository');
    console.log('pins length: ', pinArray.length);
    console.log(pinArray);
    db.close();
  });
});
