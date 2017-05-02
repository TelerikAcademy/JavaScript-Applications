var express = require('express'),
  idGenerator = require('../utils/id-generator')();

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
      var todos = user.todos;
      res.json({
        result: todos
      });
    })
    .post('/', function(req, res) {
      var user = req.user;
      if (!user) {
        res.status(401)
          .json('Not authorized User');
        return;
      }
      var todo = {
        id: idGenerator.next(),
        text: req.body.text,
        state: !!req.body.state || false,
        category: req.body.category || 'uncategorized'
      };
      user.todos = user.todos || [];

      user.todos.push(todo);

      res.status(201)
        .json({
          result: todo
        });
    })
    .put('/:id', function(req, res) {
      var user = req.user;
      if (!user) {
        res.status(401)
          .json('Not authorized User');
        return;
      }
      var id = +req.params.id;
      var todo = user.todos.find(function(dbTodo) {
        return dbTodo.id === id;
      });
      if (!todo) {
        res.status(404)
          .json('Todo with such id does not exist in DB');
        return;
      }

      var update = req.body;

      todo.text = (typeof update.text === 'undefined') ? todo.text : update.text;
      todo.state = (typeof update.state === 'undefined') ? todo.state : update.state;

      db.save();

      res.json({
        result: todo
      });
    });
  return router;
};
