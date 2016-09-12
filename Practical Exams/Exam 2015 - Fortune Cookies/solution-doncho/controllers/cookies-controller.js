var _ = require('lodash');
const PAGE_SIZE = 10,
  DEFAULT_COOKIE_IMAGE = 'https://dayinthelifeofapurpleminion.files.wordpress.com/2014/12/batman-exam.jpg';

module.exports = function(db) {

  function _validate(cookie) {

  }

  function get(req, res) {
    var cookies = _.chain(db('cookies'))
      .sortBy(function(cookie) {
        return -cookie.likes || (cookie.postDate - 0);
      });

    res.json({
      result: cookies
    });
  }

  function post(req, res) {
    var user = req.user;
    if (!user) {
      res.status(401)
        .json('User not authorized');
      return;
    }
    var cookie = req.body;
    var validationError = _validate(cookie);
    if (validationError) {
      res.status(400)
        .json(validationError.message);
      return;
    }
    cookie.userId = user.id;
    cookie.likes = 0;
    cookie.dislikes = 0;
    cookie.img = cookie.img || DEFAULT_COOKIE_IMAGE;
    cookie.shareDate = new Date();
    db('cookies').insert(cookie);
    res.json({
      result: cookie
    });
  }

  function put(req, res) {
    var user = req.user;
    if (!user) {
      res.status(401)
        .json('User not authorized');
      return;
    }

    var cookieId = req.params.id;
    var cookie = db('cookies').find({
      id: cookieId
    });

    if (!cookie) {
      res.status(404)
        .json('Invalid cookie ID');
      return;
    }
    var type = req.body.type;
    if (['like', 'dislike'].indexOf(type) < 0) {
      res.status(400)
        .json('Request type must be either "like" or "dislike"');
      return;
    }

    if (req.body.type === 'like') {
      cookie.likes += 1;
    } else {
      cookie.dislikes += 1;
    }
    db.save();

    res.json({
      result: cookie
    });
  }

  return {
    get: get,
    post: post,
    put: put
  };
};
