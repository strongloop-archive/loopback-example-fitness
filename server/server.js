var loopback = require('loopback');
var boot = require('loopback-boot');
var passport = require('passport');
var fitBitStrategy = require('passport-fitbit').Strategy;
var app = module.exports = loopback();
var user = require('./fitbitAPI/userInfo.js');

module.exports.access = {
  "token" : "",
  "secret" : ""
};

module.exports.activities = {};

// Set up the /favicon.ico
app.use(loopback.favicon());

// request pre-processing middleware
app.use(loopback.compress());

// -- Add your pre-processing middleware here --

// boot scripts mount components like REST API
boot(app, __dirname);

// Initialize passport and passport session
app.use(passport.initialize());
app.use(passport.session());

app.use(loopback.session({
	'secret' : 'Random string'
}));

// -- Mount static files here--
// All static middleware should be registered at the end, as all requests
// passing the static middleware are hitting the file system
// Example:
var path = require('path');
app.use(loopback.static(path.resolve(__dirname, '../client')));

// Using routes
app.use(require('./routes'));

// Requests that get this far won't be handled
// by any middleware. Convert them into a 404 error
// that will be handled later down the chain.
app.use(loopback.urlNotFound());

// The ultimate error handler.
app.use(loopback.errorHandler());

app.start = function() {
	// start the web server
	return app.listen(function() {
		app.emit('started');
		console.log('Web server listening at: %s', app.get('url'));
	});
};

// start the server if `$ node server.js`
if (require.main === module) {
	app.start();
	// UserInfo.initLoopback();
}

// Passport fitbit strategy
passport.use(new fitBitStrategy({
  consumerKey : app.get('clientID'),
  consumerSecret : app.get('clientSecret'),
  callbackURL : app.get('callbackURL')
}, function(token, tokenSecret, profile, done) {
	process.nextTick(function() {
		module.exports.access.token = token;
		module.exports.access.secret = tokenSecret;
		done(null, profile);
	});
}));

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});
