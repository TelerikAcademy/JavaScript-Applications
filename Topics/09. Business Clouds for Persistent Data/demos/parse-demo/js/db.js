var db = (function() {
  Parse.initialize("71XIbTJLcs0x2RlydH0C5aTIWY2pj2qMBwNOsmPP", "i6llvYLHwF4ZtUUAKkVvZswwuTdAMAurpN8Xkb8d");

  var Person = Parse.Object.extend('Person');

  function _dbPersonToPerson(dbPerson) {
    return {
      name: dbPerson.get('name'),
      age: dbPerson.get('age')
    };
  }

  function _byUserId(userId) {
    return function(item) {
      return !!item.get('user') && item.get('user').id === userId;
    };
  }

  function save(person) {
    var promise = new Promise(function(resolve, reject) {
      if (!hasUser()) {
        reject({
          'msg': 'User is not logged in'
        });
      }
      var dbPerson = new Person();

      dbPerson.set('name', person.name);
      dbPerson.set('age', person.age);
      dbPerson.set('user', Parse.User.current());

      dbPerson.save()
        .then(function() {
          person.id = dbPerson.objectId;
          resolve(person);
        });
    });

    return promise;
  }

  function load() {
    var query = new Parse.Query(Person);

    var promise = new Promise(function(resolve, reject) {
      query.find()
        .then(function(dbPersons) {
          var userId = Parse.User.current().id;
          return dbPersons
            .filter(_byUserId(userId))
            .map(_dbPersonToPerson);
        })
        .then(function(persons) {
          resolve(persons);
        });
    });

    return promise;
  }

  function hasUser() {
    return !!Parse.User.current();
  }

  function login(username, password) {
    var promise = new Promise(function(resolve, reject) {
      Parse.User.logIn(username, password)
        .then(function() {
          resolve();
        }, function(err) {
          return Parse.User.signUp(username, password)
        })
        .then(resolve, reject);
    });
    return promise;
  }

  function logout() {
    var promise = new Promise(function(resolve, reject) {
      Parse.User.logOut()
        .then(resolve, reject);
    });
    return promise;
  }

  function getUser() {
    return Parse.User.current().get('username');
  }

  return {
    hasUser, getUser, save, load, login, logout
  };
}());
