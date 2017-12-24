// 初始化并生成按照指定的方式生成PIN码，存储到数据库
// 使用方式：
// npm run initdb -- N K
// N: 多少个PIN码
// K: 每个PIN码多少位
// 例如： npm run initdb -- 50 4

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
