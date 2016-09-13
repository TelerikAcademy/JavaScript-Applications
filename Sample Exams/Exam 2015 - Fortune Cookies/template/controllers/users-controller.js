module.exports = function(db) {
  const AUTH_KEY_LENGTH = 60,
    AUTH_KEY_CHARS = 'qwertyuiopasdfghjklzxcvbnmWERTYUIOPASDFGHJKLZXCVBNM';

  function validate(user) {

  }

  function generateAuthKey(uniquePart) {
    var authKey = uniquePart,
      index;
    while (authKey.length < AUTH_KEY_LENGTH) {
      index = Math.floor(Math.random() * AUTH_KEY_CHARS.length);
      authKey += AUTH_KEY_CHARS[index];
    }
    return authKey;
  }

  function get(req, res) {
    var user = req.user;
    if (!user) {
      res.status(401)
        .json('Unauthorized user!');
      return;
    }
    var users = db('users')
      .map(function(user) {
        return {
          username: user.username,
          id: user.id
        };
      });

    res.json({
      result: users
    });
  }

  function post(req, res) {
    var user = req.body;
    if (!user || typeof user.username !== 'string' || typeof user.passHash !== 'string') {
      res.status(400)
        .json('Invalid user');
      return;
    }
    var error = validate(user);

    if (error) {
      res.status(400)
        .json(error.message);
      return;
    }
    var dbUser = db('users').find({
      usernameToLower: user.username.toLowerCase()
    });

    if (dbUser) {
      res.status(400)
        .json('Duplicated user');
      return;
    }
    user.usernameToLower = user.username.toLowerCase();
    db('users').insert(user);
    res.status(201)
      .json({
        result: {
          username: user.username
        }
      });
  }

  function put(req, res) {
    var reqUser = req.body;
    var user = db('users').find({
      usernameToLower: reqUser.username.toLowerCase()
    });
    if (!user || user.passHash !== reqUser.passHash) {
      res.status(404)
        .json('Invalid username or password');
      return;
    }
    if (!user.authKey) {
      user.authKey = generateAuthKey(user.id);
      db.save();
    }

    res.json({
      result: {
        username: user.username,
        authKey: user.authKey
      }
    });
  }

  return {
    get: get,
    post: post,
    put: put
  };
};
