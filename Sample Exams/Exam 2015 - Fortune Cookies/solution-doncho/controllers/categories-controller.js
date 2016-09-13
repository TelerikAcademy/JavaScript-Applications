var _ = require('lodash');

module.exports = function(db) {

  function get(req, res) {
    var categories = _.chain(db('cookies'))
      .map(function(cookie) {
        return cookie.category;
      }).uniq()
      .value();
    res.json({
      result: categories
    });
  }

  return {
    get: get
  };
};
