# Workshop 1: Simple Forum with jQuery and Promises

##  Description

Implement a SPA app for forum with threads and message following the requirements:

- Mandatory use:
  - jQuery for ajax calls
  - ES2015 `Promise`
- Use the endpoints below
- Implement the functions in `data.js`

## Starting the node server
- Open CMD/Terminal and navigate to the checked-out repository with the workshop
- Run `npm install` in the CMD/Terminal
    - A folder `node_modules` should appear
- Run `bower install` in the CMD/Terminal
    - _Note_: If you do not have bower installed do so by running `npm install -g bower`
    - A folder `bower_modules` should appear
- Run `npm start` and you should see a message like: `Server is running at http://localhost:1509`
    - You can test it by browsing to `http://localhost:1509/api/threads`

##  Server endpoints
### User endpoints
- **GET** `api/users`
  - **Responds** with an **array of users**
  - Each user has properties `username` and `id`
      - _Example:_
```js
  [{
    username: 'JohnDone',
    id: 1
  },{
    username: 'JaneDoe',
    id: 2
  }]
```

- **POST** `api/users`
  - Registers a new user
      - Used for endpoints that need authentication
  - **Takes** a `username` and `hashed passwod`
      - _Example:_
```js
  var user = {
    username: 'JohnDoe',
    passHash: 'jh12h312h3jh12h3jh12h312h312h3jh12h312h3'
  }
```
  - **Responds** with `username` and `authentication key`

      - _Example:_
```js
  {
    username: 'JohnDone',
    authKey: 'JohnDoe12312345678901234567890123456789012345678901234567890'
  }
```

- **PUT** `api/auth`
  - Logs in an user
      - Used for endpoints that need authentication
  - **Takes** a `username` and `hashed passwod`
      - _Example:_
```js
  var user = {
    username: 'JohnDoe',
    passHash: 'jh12h312h3jh12h3jh12h312h312h3jh12h312h3'
  }
```
  - **Responds** with `username` and `authentication key`
      - _Example:_
```js
  {
    username: 'JohnDone',
    authKey: 'JohnDoe12312345678901234567890123456789012345678901234567890'
  }
```

### Thread endpoints
- **GET** `api/threads`
  - **Responds** with an `array` of threads
  - Each thread has properties `title`, `id`, `user` and `postDate`
  - _Example:_
```js
  [{
    title: 'Teamwork defense',
    id: 1,
    user: {
      username: 'JohnDoe',
      id: 1
    },
    postDate: '....'
  }, {
    username: 'JS Apps Rocks!',
    id: 2000,
    user: {
      username: 'JohnDoe',
      id: 1
    },
    postDate: '....'
  }]
```

- **GET** `api/threads/:id`
  - Gets a thread
  - The thread has `title`, `id`, `postDate` and an array of `messages`

- **POST** `api/threads`
  - Needs authentication
  - Takes a `title`:
      - _Example:_
    ```js
      var thread = {
        title: 'JS Rocks!',
      }
    ```
  - Responds with the thread
      - _Example:_
```js
  {
    title: 'JS Rocks',
    id: 5,
    postDate: '...',
    user: {
      username: 'JohnDoe',
      id: 1
    }
  }
```

- **POST** `api/threads/:id/messages`
  - Adds a message to a thread
  - Takes a `title`:
      - _Example:_
    ```js
      var message = {
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
      }
    ```
