var app = require('../server');
var loopback = require('loopback');
var moment = require('moment');
var ds = app.dataSources.fitbit;
var userActivityModel = ds.createModel('userActivityModel', {}, {
	base : loopback.Model
});
var oauth_signature = require('oauth-signature');

userActivityModel.getUserActivities.shared = true;

userActivityModel.generateSignature = function(date, accessToken, tokenSecret) {
	var parameters = {
	  oauth_consumer_key : app.get('clientID'),
	  oauth_token : accessToken,
	  oauth_nonce : 'fvrebrberereber',
	  oauth_timestamp : moment().unix(),
	  oauth_signature_method : 'HMAC-SHA1',
	  oauth_version : '1.0'
	};

	return encodedSignature = oauth_signature.generate('GET',
	    'https://api.fitbit.com/1/user/244X7H/activities/date/' + date + '.json',
	    parameters, app.get('clientSecret'), tokenSecret);
};

module.exports = userActivityModel;
app.model(userActivityModel);
