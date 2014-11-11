var router = require('../../server/routes/index.js');

module.exports = function(userActivityModel){
	userActivityModel.getActivities = function(date, accessToken, accessSecret, cb) {
		console.log('Start getActivities');
		router.getActivities(date, accessToken, accessSecret, function(data){
			console.log('Callback getActivities');
			cb(null, data);
		});
  };
   
  userActivityModel.remoteMethod(
      'getActivities',
      {
        accepts: [{arg: 'date', type: 'string'}, 
                  {arg: 'accessToken', type: 'string'},
                  {arg: 'accessSecret', type: 'string'}],
        returns: {arg: 'greeting', type: 'json'}
      }
  );
};
