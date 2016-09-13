var _ = require('lodash');
const PAGE_SIZE = 10,
  DEFAULT_COOKIE_IMAGE = 'https://dayinthelifeofapurpleminion.files.wordpress.com/2014/12/batman-exam.jpg';


module.exports = function(db) {

  function getRandomCookie() {
    var cookies = db('cookies').value();
    var index = Math.floor(Math.random() * cookies.length);
    return cookies[index];
  }

  function get(req, res) {
    var user = req.user;
    if (!user) {
      res.status(401)
        .json('User not authorized');
      return;
    }
    var myCookie;

    if (user.myCookies) {
      myCookie = _.last(user.myCookies);
      var now = new Date().getHours();
      var myCookieTime = myCookie.hours;
      if (myCookieTime !== now) {
        myCookie = getRandomCookie();
      }
    } else {
      myCookie = getRandomCookie();
    }

    user.myCookies = user.myCookies || [];

    myCookie.hours = new Date().getHours();
    user.myCookies.push(myCookie);

    db.save();

    res.json({
      result: _.last(user.myCookies)
    });
  }

  return {
    get: get
  };
};
