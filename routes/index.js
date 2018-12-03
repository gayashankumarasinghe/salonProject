var express = require('express');
var router = express.Router();

const topRated = require('../services/TopRated');
const  search = require('../services/Search');

router.get('/', function(req, res, next) {
    topRated.topRatedStylists(req, res);
});


router.post('/search', function(req, res, next) {
    search.primarySearch(req,res);
});
module.exports = router;
