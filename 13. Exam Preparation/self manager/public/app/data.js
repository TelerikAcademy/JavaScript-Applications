var data = (function() {
  const LOCAL_STORAGE_USERNAME_KEY = 'signed-in-user-username',
    LOCAL_STORAGE_AUTHKEY_KEY = 'signed-in-user-auth-key';

  /* Users */

  function register(user) {
    var reqUser = {
      username: user.username,
      passHash: CryptoJS.SHA1(user.username + user.password).toString()
    };

    return jsonRequester.post('api/users', {
        data: reqUser
      })
      .then(function(resp) {
        var user = resp.result;
        localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, user.username);
        localStorage.setItem(LOCAL_STORAGE_AUTHKEY_KEY, user.authKey);
        return {
          username: resp.result.username
        };
      });
  }


  function signIn(user) {
    var reqUser = {
      username: user.username,
      passHash: CryptoJS.SHA1(user.username + user.password).toString()
    };

    var options = {
      data: reqUser
    };

    return jsonRequester.put('api/users/auth', options)
      .then(function(resp) {
        var user = resp.result;
        localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, user.username);
        localStorage.setItem(LOCAL_STORAGE_AUTHKEY_KEY, user.authKey);
        return user;
      });
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
    return jsonRequester.get('api/users')
      .then(function(res) {
        return res.result;
      });
  }

  /* Todos */
  function todosGet() {
    var options = {
      headers: {
        'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
      }
    };
    return jsonRequester.get('api/todos', options)
      .then(function(res) {
        return res.result;
      });
  }

  function todosAdd(todo) {
    var options = {
      data: todo,
      headers: {
        'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
      }
    };

    return jsonRequester.post('api/todos', options)
      .then(function(resp) {
        return resp.result;
      });
  }

  function todosUpdate(id, todo) {
    var options = {
      data: todo,
      headers: {
        'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
      }
    };
    return jsonRequester.put('api/todos/' + id, options)
      .then(function(resp) {
        return resp.result;
      });
  }

  /*  Events */

  function eventsGet() {
    var options = {
      headers: {
        'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
      }
    };
    return jsonRequester.get('api/events', options)
      .then(function(res) {
        return res.result;
      });
  }

  function eventsAdd(event) {
    var options = {
      data: event,
      headers: {
        'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
      }
    };

    return jsonRequester.post('api/events', options)
      .then(function(resp) {
        return resp.result;
      });
  }


  /* Categories */
  function categoriesGet() {
    var options = {
      headers: {
        'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
      }
    };

    return jsonRequester.get('api/categories', options)
      .then(function(res) {
        console.log('THERE!');
        return res.result;
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
  };
}());
