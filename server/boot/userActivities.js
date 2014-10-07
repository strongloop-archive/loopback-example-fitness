var app = require('../server');
var loopback = require('loopback');
var moment = require('moment');
var ds = app.dataSources.fitbit;
var activityModel = ds.createModel('Activities', {}, {base:loopback.Model});

//activityModel.getUserActivities = function(data, cb){
//	console.log(data);
//	cb(null, data);
//};

//activityModel.getUserActivities.shared = true;
//activityModel.getUserActivities.accepts = [{arg: 'date', type: 'string', http: {source: 'path'}}];
//activityModel.getUserActivities.returns = [{arg: 'data', type: 'object', root: true} ];
//activityModel.getUserActivities.http = {verb: 'get', path: '/:date'};

exports.getUserActivities = function(accessToken, cb){
	console.log('accessToken: ', accessToken);
  activityModel.getUserActivities('2012-12-13', moment().unix(), accessToken, function(err, data){
  	console.log('Data: ', data);
  	console.log('Err: ', err);
  	cb(data);
  });
};

app.model(activityModel);

module.exports.activityModel = activityModel;

