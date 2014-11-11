/*
	 * Set response type to 
	 * server - for checking server side ui 
	 * app - to send response to mobile application
*/

var loopback = require('loopback');
var router = module.exports = loopback.Router();
var passport = require('passport');
var Handlebars = require('handlebars');
var user = require('../fitbitAPI/userInfo.js');
var server = require('../server.js');
var moment = require('moment');
var userActivities = require('../boot/userActivities.js');
var genericActivities = require('../boot/weekActivities.js');
var rs = require('randomstring');
var debug = require('debug')('router');
var loginTemp = require('../views/login.hbs');
var homeTemp = require('../views/home.hbs');
var activitiesTemp = require('../views/activities.hbs');
var userProfile = require('../boot/userProfile.js');
var randomString = rs.generate(10);

router.get('/auth/fitbit', passport.authenticate('fitbit'));

router.get('/', function(req, res) {
	res.redirect('/login');
});

router.get('/login', function(req, res) {
	res.redirect('/auth/fitbit');
});

router.get('/auth/fitbit/callback', passport.authenticate('fitbit', {
  successRedirect : '/auth/success',
  errorRedirect : '/auth/failure'
}), function(req, res) {
});

router.get('/auth/success', function(req, res) {
	if (server.get('responseType') == "server") {
		res.send(homeTemp({
			'success' : 'Logged in successfully'
		}));
	}

	else if (server.get('responseType') == "app") {
		res.send({
			'status' : 'success'
		});
	}
});

router.get('/auth/failure', function(req, res) {
	/* User interface for server side */
	if (server.get('responseType') == "server") {
	 res.send(homeTemp({
	 'failure' : 'Login unsuccessfull'
	 }));
	}
	else if (server.get('responseType') == "app") {
	res.send({
		'status' : 'failure'
	});
	}
});

router.get('/user/activities', function(req, res) {
	console.log('Get activities');
	var date = req.query.date;
	// Set default date to get existing data from fitbit api
	if (date === null || date == null)
		date = '2012-12-10';

	date = moment(date).format('YYYY-MM-DD');

	userActivities.getUserActivities(server.get('clientID'), date, moment()
	    .unix(), server.access.token, userActivities.generateSignature(date,
	    server.access.token, server.access.secret, randomString), randomString,
	    function(err, data) {
		    data['date'] = moment(date).format('MM/DD/YYYY');
		    debug('data: ' + JSON.stringify(data));

			returndata = data;

			userProfile.getAttribute('fullName',server.access.userID,function(data){
				returndata.summary['fullName'] = data;	

				if (server.get('responseType') == "server") {
			    res.send(activitiesTemp({
				    'data' : returndata
			    }));
		    	} else if (server.get('responseType') == "app") {
				    res.send({
					    'data' : returndata
				    });
		   	    }
			});
	    });
});