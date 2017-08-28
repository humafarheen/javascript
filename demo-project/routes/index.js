var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

var url = 'mongodb://localhost:27017/test'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req,res,next) {
  mongo.connect(url, function(err, db) {
    var resultArray = [];
    var cursor = db.collection('user-data').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null,err);
      resultArray.push(doc);
    }, function( {
      db.close();
      res.render('index', {items: resultArray});
    }));
  });
});

router.post('/insert', function(req,res,next) {
  mongo.connect(url, function(err,db) {
    var item = req.body.item;
    assert.equal(null,err);
    db.collection('user-data').insertOne(item, function(error, result) {
      assert.equal(null,error);
      console.log("Item inserted");
      db.close();
    });
  });
});
router.post('/submit', function(request, response, next) {

});
module.exports = router;
