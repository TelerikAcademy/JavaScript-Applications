import 'sammy'
import 'jquery'
import usersController from 'js/controllers/usersController.js'
import postsController from 'js/controllers/postsController.js'

var containerId = '#main';
var sammyApp = Sammy(containerId, function() {
    this.get('#/', function() {
        this.redirect('#/posts');
    });

    this.get('#/register', usersController.register);
    this.get('#/login', usersController.login);
    this.get('#/logout', usersController.logout);

    this.get('#/posts', postsController.all);
    this.get('#/posts/:size/:page', postsController.all);
    this.get('#/post/new', postsController.add);
});

sammyApp.run('#/');