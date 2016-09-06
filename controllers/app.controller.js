var express = require('express');
var router = express.Router();

// use session auth to secure the angular app files
router.use('/', function (req, res, next) {
	console.log(req.path, 'auth_cookie:', req.cookies.auth_token);
    if (req.path !== '/login' && !req.session.token) {
        return res.redirect('/login?returnUrl=' + encodeURIComponent('/app' + req.path));
    }

    next();
});

// make JWT token available to angular api
router.get('/token', function (req, res) {
	res.cookie('auth_token', 'jwt_token_content', {
		expire : new Date() + 9999,
		httpOnly: true
		//secure: true
		}
	);
    res.send(req.session.token);
});

// serve angular app files from the '/app' route
router.use('/', express.static('app'));

module.exports = router;
