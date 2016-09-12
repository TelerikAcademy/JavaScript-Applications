var db = function() {
  var items = [];

  function getAjax() {
    var promise = new Promise(function(resolve, reject) {
      $.ajax({
        url: 'api/items',
        method: 'GET',
        contentType: 'application/json',
        success: function(res) {
          resolve(res);
        },
        error: function(err) {
          reject(err);
        }
      });
    });

    return promise;
  }

  function get() {
    var promise = new Promise(function(resolve, reject) {
      resolve({
        result: items,
        length: items.length
      });
    });

    return promise;
  }

  function getById(id) {
    id = +id;
    var promise = new Promise(function(resolve, reject) {
      for (var i = 0; i < items.length; i += 1) {
        if (items[i].id === id) {
          resolve({
            result: items[i]
          });
          return;
        }
      }
      reject({
        msg: 'Invalid id'
      });
    });

    return promise;
  }

  var lastId = 0;

  function save(item) {
    var promise = new Promise(function(resolve, reject) {
      item.id = lastId += 1;
      items.push(item);
      resolve(item);
    });

    return promise;
  }

  return {
    get: get,
    getById: getById,
    save: save
  };
}();
