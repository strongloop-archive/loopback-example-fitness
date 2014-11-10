var router = require('../../server/routes/index.js');

module.exports = function(userActivities){
	router.getActivities = function(date, accessToken, accessSecret, cb) {
		console.log('Start getActivities');
		userAct.getAcitivties(function(data){
			console.log('Callback getActivities');
			cb(null, data);
		});
		//cb(null, 'Greetings... ' + msg);
  };
   
  userActivities.remoteMethod(
      'getActivities',
      {
        accepts: [{arg: 'date', type: 'string'}, 
                  {arg: 'accessToken', type: 'string'},
                  {arg: 'accessSecret', type: 'string'}],
        returns: {arg: 'greeting', type: 'json'}
      }
  );
};
