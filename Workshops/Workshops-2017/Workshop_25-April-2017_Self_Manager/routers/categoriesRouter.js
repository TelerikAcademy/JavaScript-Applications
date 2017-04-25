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
        var todoCategories = [];
        if (user.todos) {
          todoCategories = user.todos.map(function(todo) {
            return todo.category;
          });
        }
        var eventCategories = [];
        if (user.events) {
          eventCategories = user.events.map(function(event) {
            return event.category;
          });
        }
        return todoCategories.concat(eventCategories);
      });

    categories = _.chain(categories)
      .flatten(categories, true)
      .sortBy(function(cat) {
        return cat.toLowerCase();
      }).uniq()
      .value();

    res.json({
      result: categories
    });
  });
  return router;
};
