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

      var now = new Date();
      var indicesToRemove = [];
      user.events = user.events || [];

      user.events.forEach(function(event, index) {
        var date = new Date(event.date);
        if (date - now <= 0) {
          indicesToRemove.push(index);
        }
      });

      indicesToRemove.forEach(function(indexToRemove) {
        user.events.splice(indexToRemove, 1);
      });
      db.save();

      user.events.sort(function(e1, e2) {
        return new Date(e1.date) - new Date(e2.date);
      });

      var events = user.events || [];
      events = events.map(function(dbEvent) {
        var event = {
          id: dbEvent.id,
          title: dbEvent.title,
          category: dbEvent.category,
          description: dbEvent.description,
          date: dbEvent.date,
          creator: db('users').find({
            id: dbEvent.creatorId
          }).username,
          users: dbEvent.users.map(function(userId) {
            return {
              id: userId,
              username: db('users').find({
                id: userId
              })
            };
          })
        };
        return event;
      });

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

      var usersUsernames = req.body.users || [];

      var users = usersUsernames.map(function(username) {
        return db('users').find({
          usernameLower: username.toLowerCase()
        });
      }).filter(function(user) {
        return !!user;
      });
      if (users.length !== usersUsernames.length) {
        res.status(400)
          .json('Invalid users added');
        return;
      }

      users.push(user);

      user.events = user.events || [];

      var event = {
        id: idGenerator.next(),
        title: req.body.title,
        category: req.body.category || 'uncategorized',
        description: req.body.description,
        date: new Date(req.body.date),
        creatorId: user.id,
        users: users.map(function(user) {
          return user.id;
        })
      };

      users.forEach(function(user) {
        user.events = user.events || [];
        user.events.push(event);
      });
      db.save();

      // user.events.push(event);

      res.status(201)
        .json({
          result: event
        });
    });
  return router;
};
