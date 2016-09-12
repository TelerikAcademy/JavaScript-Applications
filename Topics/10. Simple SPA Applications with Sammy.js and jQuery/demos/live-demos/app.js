var express = require('express'),
  app = express();

app.use(express.static('public'));

app.listen(3003, function() {
  console.log('Server running on http://localhost:3003');
});
