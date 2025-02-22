var express = require('express');
var router = express.Router();

/* GET info about the team. */
router.get('/', function(req, res, next) {
    res.render('team', { title: 'Our Team' });
});

/* GET info about the team members. */
router.get('/members', function(req, res, next) {
    res.render('team', { title: 'Team Members' });
});

module.exports = router;