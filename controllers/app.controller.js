var express = require('express');
var router = express.Router();

// use auth_token cookie to secure the angular /app files
//TODO this needs to be reworked since someone could spoof
//a legitimate cookie named auth_token. Need to actually verify
//the cookie
router.use('/', function (req, res, next) {
	if (!req.cookies.auth_token) {
        return res.redirect('/login?returnUrl=' + encodeURIComponent('/app' + req.path));
    }
    next();
});

// serve angular app files from the '/app' route
router.use('/', express.static('app'));

module.exports = router;
