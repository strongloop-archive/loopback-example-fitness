module.exports = function(User) {
  
	User.greet = function(msg, cb) {
    cb(null, 'Greetings... ' + msg);
  };
   
	User.remoteMethod(
      'greet', 
      {
        accepts: {arg: 'msg', type: 'string'},
        returns: {arg: 'greeting', type: 'string'}
      }
  );
};
