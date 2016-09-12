var express = require('express'),
  idGenerator = require('../utils/id-generator')(),
  authKeyGenerator = require('../utils/auth-key-generator');

module.exports = function(db) {
  var router = express.Router();

  router.get('/', function(req, res) {
      var page = +(req.query.page || 0),
        size = +(req.query.size || 10);

      var users = db('users')
        .chain()
        .sortBy('username')
        .slice(page * size)
        .take(size).value();

      res.json({
        result: users || []
      });
    })
    .post('/', function(req, res) {
      var user = req.body;
      console.log(user);
      user.usernameLower = user.username.toLowerCase();
      user.authKey = authKeyGenerator.get(user.id);
      if (db('users').find({
          usernameLower: user.username.toLowerCase()
        })) {
        res.status(400)
          .json('Username is already taken');
        return;
      }
      db('users').insert(user);

      res.status(201)
        .json({
          result: user
        });
    })
    .put('/auth', function(req, res) {
      var user = req.body;
      var dbUser = db('users').find({
        usernameLower: user.username.toLowerCase()
      });
      if (!dbUser || dbUser.passHash !== user.passHash) {
        res.status(404)
          .json('Username or password is invalid');
      }
      res.json({
        result: {
          username: dbUser.username,
          authKey: dbUser.authKey
        }
      });
    });
  return router;
};
