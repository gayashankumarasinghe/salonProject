var express = require('express');
var router = express.Router();

const topRated = require('../services/topRated');
router.get('/', function(req, res, next) {
    topRated.topRatedStylists(req, res);
});


router.get('/search', function(req, res, next) {
    res.render('searchResults');
});
module.exports = router;
