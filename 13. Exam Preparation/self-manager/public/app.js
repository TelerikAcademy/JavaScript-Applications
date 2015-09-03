(function() {
  var sammyApp = Sammy('#content', function() {
    var $content = $('#content');

    var todosController = todosControllerFactory.get($content),
      eventsController = eventsControllerFactory.get($content);

    this.get('#/', function() {
      templates.get('home')
        .then(function(template) {
          $content.html(template());
        });
    });

    this.get('#/todos', todosController.all);
    this.get('#/todos/add', todosController.add);

    this.get('#/events', eventsController.all);
    this.get('#/events/add', eventsController.add);
  });

  $(function() {
    sammyApp.run('#/');

    $('#btn-sign-in').on('click', function() {
      var user = {
        username: $('#tb-username').val(),
        password: $('#tb-password').val()
      };
      data.users.signIn(user)
        .then(function(user) {
          document.location = '#/';
          document.location.reload(true);
        }, function(err) {
          console.log(err);
        });
    });
  });
}());
