var data = (function() {
  const LOCAL_STORAGE_USERNAME_KEY = 'signed-in-user-username',
    LOCAL_STORAGE_AUTHKEY_KEY = 'signed-in-user-auth-key';

  /* Users */

  function register(user) {
    var promise = new Promise(function(resolve, reject) {
      var reqUser = {
        username: user.username,
        passHash: CryptoJS.SHA1(user.username + user.password).toString()
      };

      $.ajax('api/users', {
        method: 'POST',
        data: JSON.stringify(reqUser),
        contentType: 'application/json',
        success: function(resp) {
          var user = resp.result;
          localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, user.username);
          localStorage.setItem(LOCAL_STORAGE_AUTHKEY_KEY, user.authKey);
          resolve();
        },
        err: function(err) {
          resject(err);
        }
      });
    });
    return promise;
  }


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
          resolve(resp);
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

  function hasUser() {
    return !!localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY) &&
      !!localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY);
  }

  function usersGet() {
    var promise = new Promise(function(resolve, reject) {
      $.getJSON('api/users', function(resp) {
        resolve(resp.result);
      }).error(function(err) {
        reject(err);
      });
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

  function todosUpdate(id, todo) {
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

  function eventsGet() {
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

  function eventsAdd(event) {
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
      var url = 'api/categories';
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


  /* Notifications */

  function notificationsGet() {
    var promise = new Promise(function(resolve, reject) {
      var url = 'api/notifications';
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

  /* Friends */

  function sentRequest(id) {
    var promise = new Promise(function(resolve, reject) {
      var body = {
        userId: id
      };
      $.ajax({
        url: 'api/friends',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(body),
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

  function confirmRequest(id) {
    var promise = new Promise(function(resolve, reject) {
      var body = {
        userId: id,
        state: 'confirm'
      };

      $.ajax({
        url: 'api/friends',
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(body),
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
  }


  return {
    users: {
      signIn,
      signOut,
      register,
      hasUser,
      get: usersGet,
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
    },
    friends: {
      sentRequest: sentRequest
    },
    notifications: {
      get: notificationsGet
    }
  };
}());
