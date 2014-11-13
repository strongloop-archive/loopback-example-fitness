var app = require('../server');
var loopback = require('loopback');
var moment = require('moment');
var ds = app.dataSources.fitbit;
var oauth_signature = require('oauth-signature');
var userActivityModel = ds.createModel('userActivityModel', {}, {
  base : loopback.Model
});

userActivityModel.getUserActivities.shared = true;

userActivityModel.generateSignature = function(date, accessToken, tokenSecret,
    randomString) {
  var parameters = {
    oauth_consumer_key : app.get('clientID'),
    oauth_token : accessToken,
    oauth_nonce : randomString,
    oauth_timestamp : moment().unix(),
    oauth_signature_method : 'HMAC-SHA1',
    oauth_version : '1.0'
  };

  return encodedSignature = oauth_signature.generate('GET',
      'https://api.fitbit.com/1/user/-/activities/date/' + date + '.json',
      parameters, app.get('clientSecret'), tokenSecret);
};

module.exports = userActivityModel;
app.model(userActivityModel);
