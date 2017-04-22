import 'sammy'
import 'jquery'
import Handlebars from 'handlebars'
import data from 'scripts/data.js'
import templates from 'scripts/templates.js'
import eventLoader from 'scripts/eventLoader.js'
import notifier from 'scripts/notifier.js'

var containerId = '#main',
    $container = $(containerId);

var sammyApp = Sammy(containerId, function() {
    this.get('#/', function() {
        this.redirect('#/home')
    });
    this.get('#/home', function() {
        templates.load('home')
            .then(function(templateHtml) {
                $container.html(templateHtml);
            })
    });
    this.get('#/shops', function() {
        Promise.all([data.shops.all(), templates.load('shops')])
            .then(function(results) {
                var template = Handlebars.compile(results[1]),
                    html = template(results[0]);

                $container.html(html);
            });

        eventLoader.shopEvents($container);
    });
    this.get('#/login', function(){
        templates.load('login')
            .then(function(templateHtml) {
                $container.html(templateHtml);
            });

        eventLoader.loginPageEvents($container);
    });
    this.get('#/search/:value', function() {
        var value = this.params.value;
        Promise.all([data.search(value), templates.load('shops')])
            .then(function(results) {
                var template = Handlebars.compile(results[1]),
                    html = template(results[0]);
                $container.html(html);
            })
    });

    eventLoader.navigationEvents($('#wrapper nav'));
    Promise.all([data.users.current(), templates.load('login-logout')])
        .then(function(results) {
            var template = Handlebars.compile(results[1]),
                html = template(results[0]);

            $('#wrapper nav').append(html);
        })
});

sammyApp.run('#/');