var controllers = controllers || {};
(function(scope) {

  function all(context) {
    if (!data.users.hasUser()) {
      toastr.warning('User not logged in, redirecting to sign up form...');
      setTimeout(function() {
        toastr.clear();
        context.redirect('#/sign-up');
      }, 1000);
      return;
    }
    var myCookie;
    data.myCookies.get()
      .then(function(resMyCookie) {
        myCookie = resMyCookie;
        // myCookie.timePassed =
        return templates.get('my-cookie');
      }).then(function(template) {
        context.$element().html(template(myCookie));
        $('.btn.btn-success').on('click', function() {
          var $this = $(this),
            cookieId = $this.parents('.cookie-box').attr('data-id');
          data.cookies.like(cookieId)
            .then(function(cookie) {
              $this.parents('.cookie-box').find('.likes').html(cookie.likes);
              toastr.clear();
              toastr.success('Cookie liked!');
            });
        });
        $('.btn.btn-danger').on('click', function() {
          var $this = $(this),
            cookieId = $this.parents('.cookie-box').attr('data-id');
          data.cookies.dislike(cookieId)
            .then(function(cookie) {
              toastr.clear();
              toastr.error('Cookie disliked!');
              $this.parents('.cookie-box').find('.dislikes').html(cookie.dislikes);
            });
        });
      });
  }

  scope.myCookie = {
    all: all,
  };
}(controllers));
