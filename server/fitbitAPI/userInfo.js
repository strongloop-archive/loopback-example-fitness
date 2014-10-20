var oauth = require('oauth');
var app = require('../server.js');

exports.initLoopback = function(){
	loopback = require('loopback');
	app = loopback();
	console.log(app);
};

exports.getUsersteps = function(accessToken, accessSecret, date, callback){
	var oauth = require('oauth');
	console.log('access token: ', accessToken);

	var OAuth = new oauth.OAuth(
			'https://api.fitbit.com/oauth/request_token',
			'https://api.fitbit.com/oauth/access_token',
			app.get('clientID'),
			app.get('clientSecret'),
			'1.0',
			null,
			'HMAC-SHA1'
		);
	
	OAuth.get(
	  'https://api.fitbit.com/1/user/-/activities/date/' + date.toString().replace(/\//g,'-') + '.json',
	  accessToken,
	  accessSecret,
  	function (err, data, res) {
  		if (err) {
  			console.error("Error fetching activity data. ", err);
  			callback(data);
  		}
  		else{
  			console.log(data);
  			callback(data);
  		}
  });
};
