var templates = function() {
  var loadedTemplates = {};

  function get(templateName) {
    var promise = new Promise(function(resolve, reject) {
      if (loadedTemplates[templateName]) {
        resolve(loadedTemplates[templateName]);
        return;
      }
      var url = 'templates/' + templateName + '.handlebars';
      console.log(url);
      $.ajax({
        url: url,
        success: function(html) {
          loadedTemplates[templateName] = html;
          resolve(html);
        },
        error: function(err) {
          console.log(err.statusText);
        }
      });
    });
    return promise;
  }

  return {
    get: get
  };
}();
