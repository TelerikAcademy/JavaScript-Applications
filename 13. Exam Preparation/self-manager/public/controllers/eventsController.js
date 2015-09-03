var eventsControllerFactory = (function() {
  function _groupByCategory(event) {
    return event.category;
  }

  function _parseGroups(events, category) {
    return {
      category,
      events
    };
  }

  function _filterByCategory(category) {
    return function(group) {
      return group.category.toLowerCase() === category.toLowerCase();
    };
  }

  function _fixDate(event) {
    return {
      title: event.title,
      date: moment(event.date).format('MMM Do YYYY, hh:mm'),
      timeRemaining: moment(event.date).fromNow(),
      description: event.description,
      category: event.category
    };
  }

  function getController($container) {
    $container = $($container);

    function all() {
      var events;
      var category = this.params.category || null;
      data.events.get()
        .then(function(resEvents) {
          events = _.chain(resEvents)
            .map(_fixDate)
            .groupBy(_groupByCategory)
            .map(_parseGroups).value();

          if (category) {
            events = events.filter(_filterByCategory(category));
          }

          return templates.get('events');
        })
        .then(function(template) {
          $container.html(template(events));
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function add(context) {
      templates.get('event-add')
        .then(function(template) {
          $container.html(template());
          return data.categories.get();
        })
        .then(function(categories) {
          $('#tb-event-category').autocomplete({
            source: categories
          });

          $('#tb-event-date').datepicker();

          $('#btn-event-add').on('click', function() {

            var event = {
              title: $('#tb-event-title').val(),
              category: $('#tb-event-category').val(),
              description: $('#tb-event-description').val(),
              date: $('#tb-event-date').val()
            };

            data.events.add(event)
              .then(function(event) {
                context.redirect(`#/events?=${event.category}`);
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
