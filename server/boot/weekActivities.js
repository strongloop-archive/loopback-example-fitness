var app = require('../server');
var loopback = require('loopback');
var moment = require('moment');
var ds = app.dataSources.generic;

var oauth_signature = require('oauth-signature');
var genericModel = ds.createModel('genericModel', {}, {
  base : loopback.Model
});

// var genericModel =
// app.dataSources.week.createModel('genericModel',{},{base:loopback.Model});

// userActivityModel.getUserActivities.shared = true;
genericModel.getdata.shared = true;

genericModel.generateSignature = function(accessToken, tokenSecret,
    randomString, domain, subdomain, date, duration) {
  var parameters = {
    oauth_consumer_key : app.get('clientID'),
    oauth_token : accessToken,
    oauth_nonce : randomString,
    oauth_timestamp : moment().unix(),
    oauth_signature_method : 'HMAC-SHA1',
    oauth_version : '1.0'
  };
  var url = 'https://api.fitbit.com/1/user/-/' + domain + '/' + subdomain
      + '/date/' + date + '/' + duration + '.json';
  console.log('URL : ' + url);
  return encodedSignature = oauth_signature.generate('GET', url, parameters,
      app.get('clientSecret'), tokenSecret);
};

module.exports = genericModel;
app.model(genericModel);
