// usersController

import 'jquery'
import data from 'js/data.js'
import templates from 'js/templates.js'
import validator from 'js/validator.js'
import notifier from 'js/notifier.js'

export default {
    register: function(username, password) {
        templates.load('register')
            .then(function(templateHtml) {
                $('#main').html(templateHtml);
            });

        $('#main').on('click', '#btn-register', function(ev) {
            var username = $('#inputEmail')[0].value,
                password = $('#inputPassword')[0].value;

            validator.lenght(password, 6, 40)
                .then(function(){
                   return data.users.register(username, password)
                })
                .then(function(data) {
                    notifier.success('User registered');
                })
                .catch(function(err) {
                    notifier.error(err);
                });
        });
    },
    login: function(username, password) {
        templates.load('login')
            .then(function(templateHtml) {
                $('#main').html(templateHtml);
            });

        $('#main').on('click', '#btn-login', function(ev) {
            var username = $('#inputEmail')[0].value,
                password = $('#inputPassword')[0].value;

            data.users.login(username, password)
                .then(function(data) {
                    notifier.success('User logged in');
                    window.location = window.location.origin;
                })
                .catch(function(err) {
                    notifier.error(err);
                });
        });
    },
    logout: function(username, password) {
        data.users.logout()
            .then(function(data) {
                notifier.success('Logged out');
                window.location = window.location.origin;
            })
            .catch(function(err) {
                notifier.error(err);
            });
    }
}