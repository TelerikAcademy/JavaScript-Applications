module.exports = function (app, data, config) {
	var posts = require('../app/controllers/posts')(data);
	var users = require('../app/controllers/users')(data);

	app.get('/post', posts.get);
	app.post('/post', posts.createNew);

	app.post('/user', users.register);
	app.post('/auth', users.login);
	app.put('/user', users.logout);
	app.get('/user', users.all);

    app.get('/', function(req, res) {
        require('fs').readFile(config.root + '/public/index.html', 'utf8', function(err, text){
            res.send(text);
        });
    });
};