'use strict';

let express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  idGenerator = require('./id-generator'),
  validator = require('./validator');

let app = express();


app.use(bodyParser.json());
app.use(cors());

let people = [];

app.get('/api/people', function(req, res) {
  res.json(people);
});

app.post('/api/people', function(req, res) {
  var person = req.body;
  person.isCool = !!person.isCool;
  var result = validator.validatePerson(person);
  if (result === null) {
    person.id = idGenerator.next().value;
    people.push(person);
    res.status(201)
      .json(person);
  } else res.status(412)
    .json(result);
});


app.listen(8886, function() {
  console.log('Server is running at http://localhost:8886');
});
