var express = require('express');
var router = express.Router();

/* GET home page.Return webpage */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
