var homeController = function() {

  function all(context) {
    templates.get('home')
      .then(function(template) {
        context.$element().html(template());
      });
  }

  return {
    all: all
  };
}();
