var app = require('../server');
var loopback = require('loopback');
var ds = app.dataSources.fitbit;
var activityModel = ds.createModel('Activities', {}, {base:loopback.Model});

module.exports=activityModel;

//activityModel.getUserActivities = function(data, cb){
//	console.log(data);
//	cb(null, data);
//};

//activityModel.getUserActivities.shared = true;
//activityModel.getUserActivities.accepts = [{arg: 'date', type: 'string', http: {source: 'path'}}];
//activityModel.getUserActivities.returns = [{arg: 'data', type: 'object', root: true} ];
//activityModel.getUserActivities.http = {verb: 'get', path: '/:date'};

// TODO : pass access token and timestamp
activityModel.getUserActivities('2012-12-13', function(err, data){
	console.log('Data: ', data);
	console.log('Err: ', err);
});

app.model(activityModel);
