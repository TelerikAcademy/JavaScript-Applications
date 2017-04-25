const AUTH_KEY_HEADER_NAME = 'x-auth-key';
module.exports = function(app, db) {
  app.use(function(req, res, next) {
    var authKey = req.headers[AUTH_KEY_HEADER_NAME];
    var user = db('users').find({
      authKey: authKey
    });
    req.user = user || null;
    next();
  });
};
