var express = require('express'),
  bodyParser = require('body-parser');

var app = express(),
  db = require('./db/db');

app.use(bodyParser.json());

require('./utils/user-authentication')(app);

app.use(express.static('public'));

function _getMsgDate(msg) {
  return msg.postDate;
}

// app.post('/api/users', function(req, res) {
//   db.users.create(req.body)
//     .then(function(user) {
//       user = {
//         username: user.username,
//         authKey: user.authKey
//       };
//       res.status(201)
//         .json(user);
//     }, function(err) {
//       res.status(400)
//         .json(err);
//     });
// });

// app.get('/api/users', function(req, res) {

//   db.users.find()
//     .then(function(users) {
//       users = users.map(function(user) {
//         return {
//           id: user.id,
//           username: user.username
//         }
//       })
//       res.json({
//         result: users
//       });
//     }, function(err) {
//       res.status(400)
//         .json(err);
//     })
// });

// app.put('/api/auth', function(req, res) {
//   var query = {
//     usernameLower: req.body.username.toLowerCase()
//   };
//   db.users.find(query)
//     .then(function(users) {
//       var user = users[0];
//       if (!user || user.passHash !== req.body.passHash) {
//         res.status(404)
//           .json({
//             err: 'Username or password is invalid'
//           });
//         return;
//       }
//       res.json({
//         username: user.username,
//         authKey: user.authKey
//       });
//     });
// });

app.post('/api/threads', function(req, res) {
  var thread = req.body;

  // console.log(req.body);
  thread.user = { username: req.body.username };

  db.threads.create(thread)
    .then(function(thread) {
      res.json({ result: thread });
    }, function(err) {
      res.status(400).json(err);
    });
});

app.get('/api/threads', function(req, res) {
  var page = +req.query.page || 0,
      size = +req.query.size || 10;

  db.threads.find()
    .then(function(threads) {
      threads.sort(function(thr1, thr2) {
        var thr1SoonestDate,
            thr2SoonestDate;
        var thrs = [thr1, thr2];
        var dates = thrs.map(function(thr) {
          if (thr.messages && thr.messages.length > 0) {
            var messageDates = thr.messages.map(_getMsgDate);
            return Math.max(messageDates);
          } else {
            return (thr.postDate - 0);
          }
        });
        return dates[0] - dates[1];
      });

      res.json({
        result: threads.slice(page * size, (page + 1) * size)
      });
    });
});

app.get('/api/threads/:id', function(req, res) {
  // console.log(typeof req.params.id);
  db.threads.find({ id: +req.params.id })
    .then(function(threads) {
      if (!threads || !threads.length) {
        res.status(404)
          .json({
            err: 'Thread not found'
          });
        return;
      }
      res.json({
        result: threads[0]
      });
      return;
    });
});

app.post('/api/threads/:id/messages', function(req, res) {
  var message = req.body;
  message.user = {
    username: req.body.username
  };

  db.threads.addMessage(+req.params.id, message)
    .then(function(message) {
      res.status(201)
        .json(message);
    });
});

var port = 1509;
app.listen(port, function() {
  console.log(`Server is running at http://localhost:${port}`);
});
