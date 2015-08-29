'use strict';
let express = require('express'),
  bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'));

let db = require('./db/db');

app.get('api/items', function(req, res) {
  db.get()
    .then(function(items) {
      res.json({
        result: items
      });
    });
});

app.get('api/items/:id', function(req, res) {
  var id = req.params.id;
  db.byId(id)
    .then(function(item) {
      res.json(item);
    });
});

app.post('/api/items', function(req, res) {
  db.save(req.body)
    .then(function(item) {
      res.status(201)
        .json(item);
    });
});

let port = 3001;
app.listen(port, function() {
  require("openurl").open(`http://localhost:${port}/index.html`);
  console.log(`Server working at http://localhost:${port}`);
});
