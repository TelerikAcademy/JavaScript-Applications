var sammyApp = (function() {
  var handlebars = window.handlebars || window.Handlebars;
  var Handlebars = window.handlebars || window.Handlebars;

  var sammyApp = Sammy('#content', function() {

    this.get('#/', function() {
      this.redirect('#/items');

      $('#content').html('Items');
    });

    this.get('#/home', function() {
      $('#content').html('Items');
    });

    this.get('#/items', function() {
      var items;
      db.get()
        .then(function(res) {
          items = res.result;
          return templates.get('items');
        })
        .then(function(html) {
          var template = handlebars.compile(html);
          $('#content').html(template({
            items: items
          }));
        });
    });


    this.get('#/items/add', function(context) {
      templates.get('item-add')
        .then(function(html) {
          var template = handlebars.compile(html);
          $('#content').html(template());

          $('#btn-add').on('click', function() {
            var item = {
              name: $('#tb-name').val(),
              age: +$('#tb-age').val(),
              gender: $('#dd-gender').val()
            };
            db.save(item)
              .then(function(item) {
                console.log('Item saved!');
                context.redirect('#/items/' + item.id);
              });
          });
        });
    });

    this.get('#/items/:id', function() {
      var item;
      db.getById(this.params.id)
        .then(function(res) {
          item = res.result;
          return templates.get('item-details');
        })
        .then(function(html) {
          var template = handlebars.compile(html);
          $('#content').html(template(item));
        });
    });

  });
  return sammyApp;
}());
