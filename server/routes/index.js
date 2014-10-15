var loopback = require('loopback');
var router = module.exports = loopback.Router();
var passport = require('passport');
var Handlebars = require('handlebars');
var user = require('../fitbitAPI/userInfo.js');
var server = require('../server.js');
var moment = require('moment');
var userActivities = require('../boot/userActivities.js');

var loginTemp = require('../views/login.hbs');
var homeTemp = require('../views/home.hbs');
var activitiesTemp = require('../views/activities.hbs');

router.get('/auth/fitbit', passport.authenticate('fitbit'));

router.get('/', function(req, res){
	res.redirect('/login');
});

router.get('/login', function(req, res){
	res.redirect('/auth/fitbit');
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

router.get('/user/activities', function(req, res){
	var date = req.query.date;
	// Set default date to get existing data from fitbit api
	if( date === null || date == null )
		date = '2012-12-10';
	
	date = moment(date).format('YYYY-MM-DD');
	
	userActivities.getUserActivities(server.get('clientID'), 
																	 date, 
																	 moment().unix(), 
																	 server.access.token, 
																	 userActivities.generateSignature(date, server.access.token, server.access.secret), 
																	 function(err, data){
                              	   data['date'] = moment(date).format('MM/DD/YYYY');
                              	     res.send(activitiesTemp({'data': data}));
																 });
});
