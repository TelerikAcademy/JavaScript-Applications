(function() {

  var sammyApp = Sammy('#content', function() {

    this.get('#/', function(context) {
      context.redirect('#/home');
    });

    this.get('#/home', controllers.home.all);
    this.get('#/home/add', controllers.home.add);

    this.get('#/my-cookie', controllers.myCookie.all);

    this.get('#/register', function(context) {
      context.redirect('#/sign-up');
    });
    this.get('#/users/register', function(context) {
      context.redirect('#/sign-up');
    });
    this.get('#/sign-up', controllers.users.register);
  });

  $(function() {
    sammyApp.run('#/');

    if (data.users.hasUser()) {
      $('#container-sign-in').hide();
    } else {
      $('#container-sign-out').hide();
    }

    $('#btn-sign-out').on('click', function() {
      data.users.signOut()
        .then(function() {
          toastr.success('User signed out!');
          document.location = '#/register';
          document.location = '#/home';
          setTimeout(function() {
            $('#container-sign-out').fadeOut(100, function() {
              console.log('Here!');
              $('#container-sign-in').fadeIn(500);
            });
          }, 1000);
        });
    });
    $('#btn-sign-in').on('click', function(e) {
      var user = {
        username: $('#tb-username').val(),
        password: $('#tb-password').val()
      };
      data.users.signIn(user)
        .then(function(user) {
          toastr.success('User signed in!');
          document.location = '#/register';
          document.location = '#/home';
          setTimeout(function() {
            $('#container-sign-in').fadeOut(100, function() {
              console.log('Here!');
              $('#container-sign-out').fadeIn(500);
            });
          }, 1000);
        }, function(err){
          toastr.error(err.responseText);
        });
    });
  });
}());
