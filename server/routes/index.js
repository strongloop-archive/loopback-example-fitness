var loopback = require('loopback');
var router = module.exports = loopback.Router();
var passport = require('passport');
var Handlebars = require('handlebars');

var loginTemp = require('../views/login.hbs');
var homeTemp = require('../views/home.hbs');

router.get('/auth/fitbit', passport.authenticate('fitbit'));

router.get('/login', function(req, res){
  res.send(loginTemp({}));
});

router.get('/auth/fitbit/callback', passport.authenticate('fitbit', {
	  successRedirect: '/auth/success',
	  errorRedirect: '/auth/failure'
	}), function(req, res){

});

router.get('/auth/success', function(req, res){
  res.send(homeTemp({'success' : 'Logged in successfully'}));
});
		
router.get('/auth/failure', function(req, res){
  res.send(homeTemp({'failure' : 'Login unsuccessfull'}));
});