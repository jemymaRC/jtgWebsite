var express = require('express');
var router = express.Router();
//var validator = require('validor');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to JarToGo' });
});

/* POST to Add User Service */
router.post('/', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: 'There was a problem adding your information to the database. Please try again later.' }
        );
    });
});

module.exports = router;
