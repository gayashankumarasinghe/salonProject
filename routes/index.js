var express = require('express');
var router = express.Router();

const topRated = require('../services/TopRated');
const search = require('../services/Search');
const showProfile = require('../services/ShowProfile');
const advancedSearch = require('../services/advancedSearch');

router.get('/', function(req, res, next) {
    topRated.topRatedStylists(req, res);
});


router.post('/search', function(req, res, next) {
    search.primarySearch(req,res);
});

router.get('/profile', function(req, res, next) {
    showProfile.profile(req,res);
});

router.post('/advsearch', function(req, res, next) {
    advancedSearch.advSearch(req,res);
});
module.exports = router;
