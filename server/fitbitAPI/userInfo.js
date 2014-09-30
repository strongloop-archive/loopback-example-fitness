var oauth = require('oauth');
var loopback = require('loopback');
var app = loopback();
module.exports.accessToken = "";
module.exports.accessSecret= "";

exports.getUsersteps = function(accessToken, accessSecret, callback){
	console.log('accessToken ' + accessToken);
	console.log('accessSecret ' + accessSecret);
	
	var oauth = require('oauth');
	
	var OAuth = new oauth.OAuth(
			'https://api.fitbit.com/oauth/request_token',
			'https://api.fitbit.com/oauth/access_token',
			"401c42d0fcae4a81a8827d3b939a3570",
			"28ab0a0d2a7c4a79a42c6c058333f1dc",
			'1.0',
			null,
			'HMAC-SHA1'
		);
	console.log(app.get('userAccessDate'));
	OAuth.get(
	  'https://api.fitbit.com/1/user/244X7H/activities/date/2012-12-10.json',
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
