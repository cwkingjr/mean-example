require('rootpath')();
var app = require('express')();
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

// use JWT auth to secure the api via auth_token cookie
app.use('/api', expressJwt({
		secret: config.secret,
		credentialsRequired: false,
		getToken: function fromCookie (req) {
			if (req.cookies.auth_token){
    			return req.cookies.auth_token;
			}else{
				return null;
			}
		}
	}).unless({
		path: [
			'/api/users/authenticate',
			'/api/users/register'
		]
	}));

// routes
app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));

// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});

// start server
var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});
