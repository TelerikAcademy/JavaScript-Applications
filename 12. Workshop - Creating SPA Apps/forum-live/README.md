# Workshop 1: Simple Forum with Sammy.js, jQuery and Handlebars

##  Description

Implement a SPA app for forum with threads and message following the requirements:

* Mandatory use:
  * jQuery
  * Handlebars
* Optionally use:
  * Sammy.js
  * Underscore/lodash
  * Library for encryption of passwords
    * i.e. CryptoJS
* Use the endpoints below

##  Server endpoints:

### User endpoints

* `POST api/users`
  * Registers a new user
  * Takes a username and hashed passwod:
    * _Example:_
    ```javascript
      var user = {
        username: 'JohnDoe',
        passHash: 'jh12h312h3jh12h3jh12h312h312h3jh12h312h3'
      }
    ```
  * Responds with username and authentication key
    * Used for endpoints that need authentication
    * _Example:_
    ```javascript
      {
        username: 'JohnDone',
        authKey: 'JohnDoe12312345678901234567890123456789012345678901234567890'
      }
    ```

* `PUT api/auth`
  * Logs in an user
  * Takes a username and hashed passwod:
    * _Example:_
    ```javascript
      var user = {
        username: 'JohnDoe',
        passHash: 'jh12h312h3jh12h3jh12h312h312h3jh12h312h3'
      }
    ```
  * Responds with username and authentication key
    * Used for endpoints that need authentication
    * _Example:_
    ```javascript
      {
        username: 'JohnDone',
        authKey: 'JohnDoe12312345678901234567890123456789012345678901234567890'
      }
    ```

* `GET api/users`
  * Responds with an array of users
  * Each user has properties `username` and `id`
    * _Example:_
    ```javascript
      [{
        username: 'JohnDone',
        id: 1
      },{
        username: 'JaneDoe',
        id: 2
      }]
    ```

### Thread endpoints

* `GET api/threads`
* Responds with an array of threads
* Each user has properties `title`, `id`, `user` and `postDate`
  * _Example:_
  ```javascript
    [{
      title: 'Teamwork defense',
      id: 1,
      user: {
        username: 'JohnDoe',
        id: 1
      },
      postDate: '....'
    },{
      username: 'JS Apps Rocks!',
      id: 2000,
      user: {
        username: 'JohnDoe',
        id: 1
      },
      postDate: '....'
    }]
  ```

* `GET api/threads/:ID`
  * Gets a thread
  * The thread has `title`, `id`, `postDate` and an array of `messages`


* `POST api/threads`
  * Needs authentication
    *
  * Takes a `title`:
    * _Example:_
    ```javascript
      var thread = {
        title: 'JS Rocks!',
      }
    ```
  * Responds with the thread
    * _Example:_
    ```javascript
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

* `POST api/threads/:id/messages`
  * Adds a message to a thread
