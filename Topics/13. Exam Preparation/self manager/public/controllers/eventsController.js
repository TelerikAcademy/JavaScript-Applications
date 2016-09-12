var eventsController = (function() {
  function all(context) {
    var events;
    var category = this.params.category || null;
    data.events.get()
      .then(function(resEvents) {
        events = _.chain(resEvents)
          .map(controllerHelpers.fixDate)
          .groupBy(controllerHelpers.groupByCategory)
          .map(controllerHelpers.parseGroups)
          .value();

        if (category) {
          events = events.filter(controllerHelpers.filterByCategory(category));
        }

        return templates.get('events');
      })
      .then(function(template) {
        context.$element().html(template(events));
      })
      .catch(function(err) {
        toastr.error(JSON.stringify(err));
      });
  }

  function add(context) {
    templates.get('event-add')
      .then(function(template) {
        context.$element().html(template());
        $('#tb-event-date').datepicker();
        $('#tb-event-time').timepicker();

        $('#btn-event-add').on('click', function() {
          var user = $('#tb-event-users').val(),
            users = (!!user.trim()) ? [user] : [];

          var event = {
            title: $('#tb-event-title').val(),
            category: $('#tb-event-category').val(),
            description: $('#tb-event-description').val(),
            date: $('#tb-event-date').val() + ' ' + $('#tb-event-time').val(),
            users: users
          };

          data.events.add(event)
            .then(function(event) {
              toastr.success(`Event "${event.title}" created!`);
              context.redirect(`#/events?=${event.category}`);
            });
        });

        return data.categories.get();
      }).then(function(categories) {
        $('#tb-event-category').autocomplete({
          source: categories
        });
        return data.users.get();
      }).then(function(users) {
        users = users.map(function(user) {
          return user.username;
        });
        $('#tb-event-users').autocomplete({
          source: users
        });

      });
  }

  return {
    all: all,
    add: add
  };

}());
