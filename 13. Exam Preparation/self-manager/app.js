var express = require('express'),
  bodyParser = require('body-parser'),
  low = require('lowdb');

var app = express(),
  db = low('data/data.json');

app.use(bodyParser.json());
app.use(express.static('public'));

var usersRouter = require('./routers/usersRouter')(db);
var todosRouter = require('./routers/todosRouter')(db);
var eventsRouter = require('./routers/eventsRouter')(db);
var categoriesRouter = require('./routers/categoriesRouter')(db);

require('./utils/authorized-user')(app, db);

app.use('/api/users', usersRouter);
app.use('/api/todos', todosRouter);
app.use('/api/events', eventsRouter);
app.use('/api/categories', categoriesRouter);
var port = 3013;

app.listen(port, function() {
  console.log(`Server is running at http://localhost:${port}`);
});
