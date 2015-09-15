var express = require('express'),
  bodyParser = require('body-parser'),
  lowdb = require('lowdb');

var db = lowdb('./data/data.json');
db._.mixin(require('underscore-db'));

var app = express();
app.use(bodyParser.json());

app.use(express.static('public'));

require('./utils/authorize-user')(app, db);

//User routes
var usersController = require('./controllers/users-controller')(db);
app.get('/api/users', usersController.get);
app.post('/api/users', usersController.post);
app.put('/api/auth', usersController.put);

// Fortune cookies
var cookiesController = require('./controllers/cookies-controller')(db);
app.get('/api/cookies', cookiesController.get);
app.post('/api/cookies', cookiesController.post);
app.put('/api/cookies/:id', cookiesController.put);
//
// My fortune cookies
var myCookiesController = require('./controllers/my-cookies-controller')(db);
app.get('/api/my-cookie', myCookiesController.get);

// Categories
var categoriesController = require('./controllers/categories-controller')(db);
app.get('/api/categories', categoriesController.get);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server is running at http://localhost:' + port);
});
