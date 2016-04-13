var async = require('async');

module.exports = function (app) {
  var loopback = require('loopback');

  var User = app.models.User;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  var users = {
    "administrator": [
      { email: 'nengzhizhi@126.com', username: 'administrator' , password: 'testpass' }
    ]
  }

  for (var key in users) {
    Role.findOrCreate({ name: key }, function (err, role) {
      async.each(users[key], function (user, callback) {
        User.findOrCreate(user, function(err, user) {
          if (!!err) {
            return callback(err);
          }

          role.principals.create({
            principalType: RoleMapping.USER,
            principalId: user.id
          }, callback);
        });
      }, function (err) {
      })
    })
  }


  // var TreasureModel = app.models.Treasure;

  // var start_time = new Date() - 1000000;
  // var end_time = start_time + 2000000;

  // TreasureModel.findOrCreate({
  //   title: '烤鱼优惠券',
  //   thumb_url: 'http://xxxx.png',
  //   start_time: start_time,
  //   end_time: end_time,
  //   quantity: 1000
  // })
}
