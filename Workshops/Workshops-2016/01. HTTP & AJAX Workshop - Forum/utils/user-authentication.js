var db = require('../db/db')

module.exports = function(app) {
  app.use('/', function(req, res, next) {
    var authKey = req.headers['x-authkey'];
    if (!authKey) {
      req.user = null;
      next();
      return;
    }
    db.users.find({
        authKey: authKey
      })
      .then(function(users) {
        var user = users[0] || null;
        req.user = user;
        next();
      }, function(err) {
        res.status(404)
          .json(err);
      });
  });
};
