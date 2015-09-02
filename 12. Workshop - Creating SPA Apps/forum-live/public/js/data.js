var data = (function() {

  const USERNAME_STORAGE_KEY = 'username-key',
    AUTH_KEY_STORAGE_KEY = 'auth-key-key';

  function userLogin(user) {
    var primi = new Promise(function(resolve, reject) {
      var reqUser = {
        username: user.username,
        passHash: CryptoJS.SHA1(user.password).toString()
      }
      console.log(user);
      console.log(reqUser);
      $.ajax({
        url: 'api/auth',
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(reqUser),
        success: function(user) {
          localStorage.setItem(USERNAME_STORAGE_KEY, user.username);
          localStorage.setItem(AUTH_KEY_STORAGE_KEY, user.authKey);
          resolve(user);
        }
      });
    });
    return primi;
  }

  function userRegister(user) {
    var prom = new Promise(function(resolve, reject) {
      var reqUser = {
        username: user.username,
        passHash: CryptoJS.SHA1(user.password).toString()
      };

      $.ajax({
        url: 'api/users',
        method: 'POST',
        data: JSON.stringify(reqUser),
        contentType: 'application/json',
        success: function(user) {
          localStorage.setItem(USERNAME_STORAGE_KEY, user.username);
          localStorage.setItem(AUTH_KEY_STORAGE_KEY, user.authKey);
          resolve(user);
        }
      });
    });
    return prom;
  }

  function userLogout() {
    var promi = new Promise(function(resolve, reject) {
      localStorage.removeItem(AUTH_KEY_STORAGE_KEY);
      localStorage.removeItem(USERNAME_STORAGE_KEY);
      resolve();
    });

    return promi;
  }

  function usersFind() {

  }

  function getCurrentUser() {
    var username = localStorage.getItem(USERNAME_STORAGE_KEY);
    if (!username) {
      return null;
    }
    return {
      username
    };
  }

  function threadsGet() {
    var pr = new Promise(function(resolve, reject) {
      $.getJSON('api/threads', function(res) {
        res.result = res.result.map(function(thread) {
          thread.postDate = moment(new Date(thread.postDate)).fromNow();
          return thread;
        });
        resolve(res);
      });
    });
    return pr;
  }

  function threadsAdd(title) {
    var p = new Promise(function(resolve, reject) {
      var body = {
        title
      };
      console.log(body);
      $.ajax({
        url: 'api/threads',
        method: 'POST',
        data: JSON.stringify(body),
        headers: {
          'x-authkey': localStorage.getItem(AUTH_KEY_STORAGE_KEY)
        },
        contentType: 'application/json',
        success: function(res) {
          resolve(res);
        }
      })
    });
    return p;
  }

  function threadById(id) {
    var q = new Promise(function(resolve, reject) {
      $.getJSON(`api/threads/${id}`, function(res) {
        resolve(res);
      });
    });
    return q;

  }

  function threadsAddMessage(threadId, message) {
    var qpromise = new Promise(function(resolve, reject) {
      $.ajax({
        url: `api/threads/${threadId}/messages`,
        method: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        headers: {
          'x-authkey': localStorage.getItem(AUTH_KEY_STORAGE_KEY)
        },
        success: function(res) {
          resolve(res);
        }
      });
    });
    return qpromise;
  }

  return {
    users: {
      login: userLogin,
      register: userRegister,
      logout: userLogout,
      find: usersFind,
      current: getCurrentUser
    },
    threads: {
      get: threadsGet,
      add: threadsAdd,
      getById: threadById,
      addMessage: threadsAddMessage
    }
  };
}());
