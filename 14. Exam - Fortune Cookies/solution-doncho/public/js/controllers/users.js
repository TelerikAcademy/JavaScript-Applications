var controllers = controllers || {};
(function(scope) {

  function register(context) {
    templates.get('register')
      .then(function(template) {
        context.$element().html(template());

        $('#btn-register').on('click', function() {
          var user = {
            username: $('#tb-reg-username').val(),
            password: $('#tb-reg-pass').val()
          };

          data.users.register(user)
            .then(function() {
              toastr.success('User registered!');
              setTimeout(function() {
                context.redirect('#/');
                document.location.reload(true);
              }, 1000);
            }, function(err){
              toastr.error(err);
            });
        });
      });
  }

  scope.users = {
    register: register
  };
}(controllers));
