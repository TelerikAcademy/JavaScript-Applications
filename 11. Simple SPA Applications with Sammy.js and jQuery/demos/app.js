'use strict';
let express = require('express'),
  bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/public'));

// let db = require('./db/db');

var items = [];

app.get('/api/items', function(req, res) {
  res.json(items);
});

app.get('/api/items/:id', function(req, res) {
  var id = req.params.id;
  db.byId(id)
    .then(function(item) {
      res.json(item);
    });
});

var lastId = 0;
app.post('/api/items', function(req, res) {
  var item = req.body;
  item.id = lastId += 1;
  items.push(item);
  res.status(201)
    .json(item);
});

let port = 3001;
app.listen(port, function() {
  require("openurl").open(`http://localhost:${port}/index.html`);
  console.log(`Server working at http://localhost:${port}`);
});
