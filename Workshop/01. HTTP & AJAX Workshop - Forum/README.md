# Workshop 1: Simple Forum with jQuery and Promises

##  Description
- You are given a partially implemented forum system.
  - It supports `Threads` that have `title`, `creator`
  - Each `Thread` has `Messages`
  - `Messages` have `content`, `author`
  - It supports a Gallery of images that come from Reddit

1. Finish the implementation of the SPA app for forum with threads and message following the requirements
    - Mandatory use:
      - jQuery for ajax calls
      - ES2015 `Promise`
  - Implement the functions in `public/scripts/data.js`
      - Your AJAX calls should be made to the server endpoints below
2. Implement the Gallery functionality

_Note: You are not required to do anything on the UI. If the implementation of the requests is correct, you should see the results on the page._

## Starting the node server
- You'll need to start the server which will server the ajax requests that you implement.
- Open CMD/Terminal and navigate to the checked-out repository with the workshop
- Run `npm install` in the CMD/Terminal
    - `npm install` will look in the `package.json` file and will download the packages listed there
    - A folder `node_modules` should appear, containing the dependencies of the server
- Run `bower install` in the CMD/Terminal
    - _Note_: If you do not have bower installed do so by running `npm install -g bower`
    - `bower install` will look in the `bower.json` file and will download the packages listed there
    - A folder `bower_modules` should appear
- Run `npm start` and you should see a message like: `Server is running at http://localhost:1509`
    - You can test it by browsing to `http://localhost:1509/api/threads`
- Once you start the server with `npm start`, go to `http://localhost:1509`.

##  Server endpoints
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
  - Takes a `title` that should be sent in the body of the request:
      - _TIPS_:
          - Use `JSON.stringify()`
          - Set the contentType to `application/json`
      - _Example:_
    ```js
      var body = {
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
  - Takes a `content` and `username` that should be sent in the body of the request:
      - _TIPS_:
          - Use `JSON.stringify()`
          - Set the contentType to `application/json`
      - _Example:_
    ```js
      var body = {
        username: 'JohnDoe',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book'
      }
    ```

### Gallery
  - **GET** `https://www.reddit.com/r/aww.json`
      -  Make a `jsonp` request



## Additional Tasks
- Fix any bugs you manage to find
  - _Examples_:
      - The UI representation of the messages
      - Refresh the UI component when a new thread or message is created (without refreshing the page. Remeber this is a SPApplication)