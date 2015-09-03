var data = (function() {
  const LOCAL_STORAGE_USERNAME_KEY = 'signed-in-user-username',
    LOCAL_STORAGE_AUTHKEY_KEY = 'signed-in-user-auth-key';

  /* Users */

  function signIn(user) {
    var promise = new Promise(function(resolve, reject) {
      var reqUser = {
        username: user.username,
        passHash: CryptoJS.SHA1(user.username + user.password).toString()
      };

      $.ajax('api/users/auth', {
        method: 'PUT',
        data: JSON.stringify(reqUser),
        contentType: 'application/json',
        success: function(resp) {
          var user = resp.result;
          localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, user.username);
          localStorage.setItem(LOCAL_STORAGE_AUTHKEY_KEY, user.authKey);
          resolve();
        }
      });
    });
    return promise;
  }

  function signOut() {
    var promise = new Promise(function(resolve, reject) {
      localStorage.removeItem(LOCAL_STORAGE_USERNAME_KEY);
      localStorage.removeItem(LOCAL_STORAGE_AUTHKEY_KEY);
      resolve();
    });
    return promise;
  }

  /* Todos */
  function todosGet() {
    var promise = new Promise(function(resolve, reject) {
      var url = 'api/todos';
      $.ajax(url, {
        method: 'GET',
        headers: {
          'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
        },
        contentType: 'application/json',
        success: function(resp) {
          resolve(resp.result);
        },
        error: function(err) {
          reject(err);
        }
      });
    });
    return promise;
  }

  function todosAdd(todo) {
    var promise = new Promise(function(resolve, reject) {
      var url = 'api/todos';
      $.ajax(url, {
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(todo),
        headers: {
          'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
        },
        success: function(resp) {
          resolve(resp.result);
        },
        error: function(err) {
          reject(err);
        }
      });
    });
    return promise;
  }

  function todosUpdate(id, todo){
    var promise = new Promise(function(resolve, reject) {
      var url = `api/todos/${id}`;
      $.ajax(url, {
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(todo),
        headers: {
          'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
        },
        success: function(resp) {
          resolve(resp.result);
        },
        error: function(err) {
          reject(err);
        }
      });
    });
    return promise;
  }

  /*  Events */

  function eventsGet(){
    var promise = new Promise(function(resolve, reject) {
      var url = 'api/events';
      $.ajax(url, {
        method: 'GET',
        headers: {
          'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
        },
        contentType: 'application/json',
        success: function(resp) {
          resolve(resp.result);
        },
        error: function(err) {
          reject(err);
        }
      });
    });
    return promise;

  }

  function eventsAdd(event){
      var promise = new Promise(function(resolve, reject) {
        var url = 'api/events';
        $.ajax(url, {
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(event),
          headers: {
            'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
          },
          success: function(resp) {
            resolve(resp.result);
          },
          error: function(err) {
            reject(err);
          }
        });
      });
      return promise;
  }


  /* Categories */
  function categoriesGet() {
    var promise = new Promise(function(resolve, reject) {
      var url = 'api/categories?notCache=' + Math.random();
      $.ajax(url, {
        method: 'GET',
        headers: {
          'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
        },
        contentType: 'application/json',
        success: function(resp) {
          resolve(resp.result);
        },
        error: function(err) {
          reject(err);
        }
      });
    });
    return promise;
  }

  return {
    users: {
      signIn,
      signOut
    },
    todos: {
      get: todosGet,
      add: todosAdd,
      update: todosUpdate
    },
    events: {
      get: eventsGet,
      add: eventsAdd
    },
    categories: {
      get: categoriesGet
    }
  };
}());
