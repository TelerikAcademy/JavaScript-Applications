// postsController

import 'jquery'
import data from 'js/data.js'
import templates from 'js/templates.js'
import notifier from 'js/notifier.js'

export default {
    all: function(sammy) {
        var size = +sammy.params['size'] || 4,
            page = +sammy.params['page'] || 0;

        Promise.all([data.posts.all(), templates.load('posts')])
            .then(function([data, template]) {
               var pagesLen = ((data.length / size) | 0) + 1,
                    pages = [];

                for (var i = 0; i < pagesLen; i+= 1) {
                    pages.push({
                        size: size,
                        page: i,
                        displayPage: i + 1
                    });
                }

                data = data.slice(page * size, (page + 1) * size);

                $('#main').html(template({
                        posts: data,
                        pages: pages
                    }
                ));
            });

        $('#main').on('click', '#btn-filter', function(ev) {
            var size = $('#dd-page-size option:selected').text(),
                page = 0;
                sammy.redirect('#/posts/' + size + '/' + page);
            });

        $('#main').on('click', '#btn-post', function(ev) {
            var title = $('#post-title')[0].value,
                body = $('#post-body')[0].value;

            data.posts.add(title, body)
                .then(function(data) {
                    notifier.success(data);
                    sammy.redirect('#/');
                }, function(err) {
                    sammy.redirect('#/login');
                });
        })
    }
}