var loopback = require('loopback');
var router = module.exports = loopback.Router();
var passport = require('passport');
var Handlebars = require('handlebars');
var user = require('../fitbitAPI/userInfo.js');
var server = require('../server.js');
var moment = require('moment');
var activities = require('../boot/userActivities.js');

var loginTemp = require('../views/login.hbs');
var homeTemp = require('../views/home.hbs');
var activitiesTemp = require('../views/activities.hbs');

router.get('/auth/fitbit', passport.authenticate('fitbit'));

router.get('/', function(req, res){
	res.redirect('/login');
});

router.get('/login', function(req, res){
//  res.send(loginTemp({}));
	res.redirect('/auth/fitbit');
});

router.get('/auth/fitbit/callback', passport.authenticate('fitbit', {
  successRedirect: '/auth/success',
  errorRedirect: '/auth/failure'
  }), function(req, res){
    console.log('END');
});

//router.get('/auth/fitbit/callback', function(data, req, res){
//	console.log('data ', data.headers.url);
//	console.log('req ', req);
//	console.log('res ', res);
//});

router.get('/auth/success', function(req, res){
  res.send(homeTemp({'success' : 'Logged in successfully'}));
});
		
router.get('/auth/failure', function(req, res){
  res.send(homeTemp({'failure' : 'Login unsuccessfull'}));
});

router.get('/user/activities', function(req, res){
	var date = req.query.date;
	if( date === null || date == null )
		date = '2012-12-10';
//  user.getUsersteps(server.accessToken, server.accessSecret, moment(date).format('YYYY/MM/DD').toString(), function(data){
//		var data = JSON.parse(data);
//  	data['date'] = date.replace(/-/g, '/');
//  	res.send(activitiesTemp({'data': data}));
//	});
	console.log('AccessSecret', server.accessSecret);
	
	activities.getUserActivities(server.accessToken, server.accessSecret,function(data){
		res.send(activitiesTemp({'data': data}));
	});
});
