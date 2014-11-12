var router = require('../../server/routes/index.js');

module.exports = function(userActivityModel){
	userActivityModel.getActivities = function(date, accessToken, accessSecret, cb) {
		router.getActivities(date, accessToken, accessSecret, function(data){
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
