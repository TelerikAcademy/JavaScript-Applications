var todosControllerFactory = (function() {
  function _groupByCategory(todo) {
    return todo.category;
  }

  function _parseGroups(todos, category) {
    return {
      category,
      todos
    };
  }

  function _filterByCategory(category) {
    return function(group) {
      return group.category.toLowerCase() === category.toLowerCase();
    };
  }

  function getController($container) {
    $container = $($container);

    function all() {
      var todos;
      var category = this.params.category || null;
      data.todos.get()
        .then(function(resTodos) {
          todos = _.chain(resTodos)
            .groupBy(_groupByCategory)
            .map(_parseGroups).value();

          if (category) {
            todos = todos.filter(_filterByCategory(category));
          }

          return templates.get('todos');
        })
        .then(function(template) {
          $container.html(template(todos));

          $('.todo-box').on('change', function() {
            var $checkbox = $(this).find('input');
            var isChecked = $checkbox.prop('checked');
            var id = $(this).attr('data-id');
            data.todos.update(id, {
              state: isChecked
            });
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function add(context) {
      templates.get('todo-add')
        .then(function(template) {
          $container.html(template());
          data.categories.get()
            .then(function(categories) {
              $('#tb-todo-category').autocomplete({
                source: categories
              });
              $('#btn-todo-add').on('click', function() {
                var todo = {
                  text: $('#tb-todo-text').val(),
                  category: $('#tb-todo-category').val()
                };

                data.todos.add(todo)
                  .then(function(todo) {
                    context.redirect('#/todos');
                  });
              });
            });
        });
    }

    return {
      all, add
    };
  }

  return {
    get: getController
  };
}());
