var userProfile = {};

userProfile.saveProfile = function(data) {
  var app = require('../server.js');
  var profile = app.models.user;
  profile.upsert({
    id : data.id,
    avatar : data._json.user.avatar,
    avatar150 : data._json.user.avatar150,
    dateOfBirth : data._json.user.dateOfBirth,
    displayName : data._json.user.displayName,
    distanceUnit : data._json.user.distanceUnit,
    encodedId : data._json.user.encodedId,
    foodsLocale : data._json.user.foodsLocale,
    fullName : data._json.user.fullName,
    gender : data._json.user.gender,
    glucoseUnit : data._json.user.glucoseUnit,
    height : data._json.user.height,
    heightUnit : data._json.user.heightUnit,
    locale : data._json.user.locale,
    memberSince : data._json.user.memberSince,
    nickname : data._json.user.nickname,
    offsetFromUTCMillis : data._json.user.offsetFromUTCMillis,
    startDayOfWeek : data._json.user.startDayOfWeek,
    strideLengthRunning : data._json.user.strideLengthRunning,
    strideLengthWalking : data._json.user.strideLengthWalking,
    timezone : data._json.user.timezone,
    waterUnit : data._json.user.waterUnit,
    weight : data._json.user.weight,
    weightUnit : data._json.user.weightUnit,
    accessToken : data.accessToken,
    accessSecret : data.accessSecret
  }, function(error, responce) {
    if (error) {
      console.log('Error in storing :' + error);
    }
    // else {console.log('Successful storing!!');}
  });
};

userProfile.getAttribute = function(attribute, userid, cb) {
  var app = require('../server.js');
  var profile = app.models.user;
  profile.findOne({
    where : {
      id : userid
    },
    fields : [ attribute ]
  }, function(err, data) {
    if (err) {
      console.log('Error : ' + err);
      cb('');
    } else if (data) {
      cb(data[attribute]);
    } else {
      cb('');
    }
  });
};

module.exports = userProfile;