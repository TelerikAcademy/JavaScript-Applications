var controllers = controllers || {};
(function(scope) {

  function all(context) {
    var sortby = context.params.sortby || 'date',
      category = context.params.category || null,
      user = context.params.user || null;

    var cookies,
      users,
      promise;
    if (data.users.hasUser()) {
      promise = data.users.get()
        .then(function(resUsers) {
          users = resUsers;
          return data.cookies.get();
        });
    } else {
      promise = data.cookies.get();
    }
    promise.then(function(resCookies) {
        cookies = resCookies;
        if (category) {
          cookies = cookies.filter(function(cookie) {
            return cookie.category.toLowerCase() === category.toLowerCase();
          });
        }

        cookies.sort(function(c1, c2) {
          if (sortby === 'date') {
            return (new Date(c2.shareDate)) - (new Date(c1.shareDate));
          }
          return c2.likes - c1.likes;
        });
        cookies = cookies.map(function(cookie) {
          cookie.timePast = moment(cookie.shareDate).fromNow();
          cookie.shareDate = moment(cookie.shareDate).format('Do MMM YYYY, hh:mm');
          if (users) {
            cookie.user = users.find(function(user) {
              return user.id === cookie.userId;
            });
          }
          return cookie;
        });

        if (user) {
          cookies = cookies.filter(function(cookie) {
            return cookie.user.username.toLowerCase() === user.toLowerCase();
          });
        }

        return templates.get('cookies');
      })
      .then(function(template) {
        context.$element().html(template(cookies));

        $('.btn-like-dislike').on('click', function() {
          if (!data.users.hasUser()) {
            toastr.warning('User is not logged in, redirection to login page...');
            setTimeout(function() {
              context.redirect('#/register');
            }, 1000);
          }
          var $this = $(this),
            cookieId = $this.parents('.cookie-box').attr('data-id'),
            type = $this.attr('data-type'),
            promise;
          if (type === 'like') {
            promise = data.cookies.like(cookieId);
          } else {
            promise = data.cookies.dislike(cookieId);
          }
          promise.then(function(cookie) {
            $this.parents('.cookie-box').find(`.${type}s`).html(cookie[`${type}s`]);
            toastr.clear();
            toastr.success(`Cookie ${type}d!`);
          });
        });

        $('.btn-share').on('click', function() {
          var $this = $(this),
            $cookieBox = $this.parents('.cookie-box');
          var cookie = {
            text: $cookieBox.find('.text').html().trim(),
            category: $cookieBox.find('.category').html().trim(),
            img: $cookieBox.find('img').attr('src')
          };
          data.cookies.add(cookie)
            .then(function(cookie) {
              toastr.success(`Cookie "${cookie.text}" reshared!`);
              setTimeout(function() {
                document.location = '#/';
              }, 1000);
            });
        });

        $('.tb-filter').on('input', function() {
          var pattern = $(this).val().toLowerCase(),
            selector = '.' + $(this).attr('data-type');
          $('.cookie-box')
            .each(function(index, cookieBox) {
              var $cookieBox = $(cookieBox),
                value = $cookieBox.find(selector).html().trim().toLowerCase();
              if (value.indexOf(pattern) >= 0) {
                $cookieBox.removeClass('hide');
              } else {
                $cookieBox.addClass('hide');
              }
            });
        });
      });
  }

  function add(context) {
    if (!data.users.hasUser()) {
      if (!data.users.hasUser()) {
        toastr.warning('User not logged in, redirecting to sign up form...');
        setTimeout(function() {
          toastr.clear();
          context.redirect('#/sign-up');
        }, 1000);
      }
    }
    templates.get('cookie-add')
      .then(function(template) {
        context.$element().html(template());
        return data.categories.get();
      })
      .then(function(categories) {

        //load categories autocomplete
        $('#tb-cookie-category').autocomplete({
          source: categories
        });

        //handle image preview
        $('#tb-cookie-img').on('input', function() {
          var url = $(this).val();
          $('#cookie-img-preview').attr('src', url);
        });

        //attach add cookie event
        $('#btn-add-cookie').on('click', function() {
          var cookie = {
            text: $('#tb-cookie-text').val(),
            category: $('#tb-cookie-category').val(),
            img: $('#tb-cookie-img').val()
          };
          data.cookies.add(cookie)
            .then(function(cookie) {
              toastr.success(`Cookie "${cookie.text}" addded!`);
              setTimeout(function() {
                document.location = '#/home';
              }, 1000);
            }, function(err) {
              toastr.error(err);
            });
        });
      });
  }

  scope.home = {
    all: all,
    add: add
  };
}(controllers));
