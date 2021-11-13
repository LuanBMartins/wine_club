var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;


// user crud
// user login
// wine crud
// wine list by register
// search suggest?
// advanced search