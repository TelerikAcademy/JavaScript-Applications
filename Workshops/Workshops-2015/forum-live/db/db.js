var storage = {
  users: [],
  threads: []
};

function idGenerator() {
  var lastId = 0;
  return {
    next: function() {
      return lastId += 1;
    }
  }
}

var generateAuthKey = (function() {
  var chars = '1234567890)(*&^%$#@!)',
    length = 60;
  return function(username) {
    var authKey = username,
      index;
    while (authKey.length < length) {
      index = (Math.random() * chars.length) | 0;
      authKey += chars[index];
    }
    return authKey;
  }
}());

var usersIdGen = idGenerator(),
  threadsIdGen = idGenerator();

function usersFind(query) {
  var promise = new Promise(function(resolve, reject) {
    if (!query) {
      resolve(storage.users);
      return;
    }
    var foundUsers = storage.users.filter(function(user) {
      return Object.keys(query)
        .every(function(key) {
          return query[key] === user[key];
        });
    });
    resolve(foundUsers);
  });
  return promise;
}

function usersCreate(user) {
  var promise = new Promise(function(resolve, reject) {
    if (typeof user !== 'object' ||
      typeof user.username !== 'string' ||
      typeof user.passHash !== 'string') {
      reject({
        err: 'User is missing either username or password'
      });
      return;
    }

    usersFind({
        usernameLower: user.username.toLowerCase()
      })
      .then(function(users) {
        if (users.length > 0) {
          reject({
            err: 'Username already exists'
          });
          return;
        }

        var dbUser = {
          id: usersIdGen.next(),
          username: user.username,
          usernameLower: user.username.toLowerCase(),
          passHash: user.passHash,
          authKey: generateAuthKey(user.username)
        };
        storage.users.push(dbUser);
        resolve(dbUser)
      });
  });
  return promise;
}

function threadsFind(query) {
  var promise = new Promise(function(resolve, reject) {
    if (!query) {
      resolve(storage.threads);
      return;
    }
    var foundThreads = storage.threads.filter(function(thread) {
      return Object.keys(query)
        .every(function(key) {
          return query[key] === thread[key];
        });
    });
    resolve(foundThreads);
  });
  return promise;
}

function threadsCreate(thread) {
  var promise = new Promise(function(resolve, reject) {
    if (typeof thread !== 'object' ||
      typeof thread.title !== 'string') {
      reject({
        err: 'Thead is missing title'
      });
      return;
    }
    thread.id = threadsIdGen.next();
    thread.postDate = new Date();
    storage.threads.push(thread);
    resolve(thread);
  });
  return promise;
}

function threadsAddMessage(id, msg) {
  var promise = new Promise(function(resolve, reject) {
    threadsFind({
        id: +id
      })
      .then(function(threads) {
        var thread = threads[0];
        if (!thread) {
          throw new Error('invalid thread id');
        }

        if (!thread.messages) {
          thread.messages = [];
        }

        msg.postDate = new Date();

        thread.messages.push(msg);

        resolve(thread);
      });
  });
  return promise;
}

module.exports = {
  users: {
    find: usersFind,
    create: usersCreate,
  },
  threads: {
    find: threadsFind,
    create: threadsCreate,
    addMessage: threadsAddMessage
  }
};
