var data = (function() {

  var items = [{
      name: 'John',
      id: 100
    }, {
      name: 'Jane',
      id: 101
    }],
    lastId = 0;

  function get() {
    var promise = new Promise(function(resolve, reject) {
      resolve({
        result: items.slice()
      });
    });

    return promise;
  }

  function save(item) {
    var promise = new Promise(function(resolve, reject) {
      item.id = lastId += 1;
      items.push(item);
      resolve({
        result: item
      });
    });

    return promise;
  }

  function getById(id) {
    id = +id;
    var promise = new Promise(function(resolve, reject) {
      var item = items.find(function(item) {
        return +item.id === id;
      });
      if (item) {
        resolve({
          result: item
        });
      } else {
        reject({
          message: 'No such item'
        });
      }
    });
    return promise;
  }

  return {
    get: get,
    save: save,
    getById: getById
  };
}());
