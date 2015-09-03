var express = require('express'),
  _ = require('lodash');

require('../polyfills/array');

module.exports = function(db) {
  var router = express.Router();

  router.get('/', function(req, res) {
    var user = req.user;
    if (!user) {
      res.status(401)
        .json('Not authorized User');
      return;
    }

    var categories = db('users')
      .map(function(user) {
        return user.todos.map(function(todo) {
          return todo.category;
        });
      });

    categories = _.flatten(categories, true);

    res.json({
      result: categories
    });
  });
  return router;
};
