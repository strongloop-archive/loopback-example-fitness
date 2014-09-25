var loopback = require('loopback');
var boot = require('loopback-boot');
var passport = require('passport');
var fitBitStrategy = require('passport-fitbit').Strategy;

var app = module.exports = loopback();

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

app.use(loopback.session({'secret' : 'Random string'}));

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
}

// Strategy for fitbit
passport.use(new fitBitStrategy({
//  consumerKey: app.get('clientID'),
//  consumerSecret: app.get('clientSecret'),
  consumerKey: '11d97ac13c704b34bd57b9c628327202',
  consumerSecret: '86c5fec39e134e0c872c781e63d3b06e',
  callbackURL: app.get('callbackURL')
}, function(token, tokenSecret, profile, done){
	process.nextTick(function(){
	  console.log('token: ' + token);
	  console.log('tokenSecret: ' + tokenSecret);
	  console.log(profile);
      console.log(JSON.stringify(profile));
      
      done(null, profile);
	});
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});
	 
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});