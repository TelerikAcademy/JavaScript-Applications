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
      var events = user.events;
      res.json({
        result: events
      });
    })
    .post('/', function(req, res) {
      var user = req.user;
      if (!user) {
        res.status(401)
          .json('Not authorized User');
        return;
      }
      var event = {
        id: idGenerator.next(),
        title: req.body.title,
        category: req.body.category || 'uncategorized',
        description: req.body.description,
        date: new Date(req.body.date)
      };
      user.events = user.events || [];

      user.events.push(event);

      res.status(201)
        .json({
          result: event
        });
    });
  return router;
};
