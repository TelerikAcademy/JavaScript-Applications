<!-- section start -->
<!-- attr: { id:'', class:'slide-title', showInPresentation:true, hasScriptWrapper:true } -->
# Promises and Asynchronous Programming
## Callback-oriented asynchrony,</br>CommonJS Promise/A, Promises in ES6, Function generators in ES6

<aside class="signature">
  <p class="signature-course">JavaScript Applications</p>
  <p class="signature-initiative">Telerik Software Academy</p>
  <a href="https://telerikacademy.com" class="signature-link">https://telerikacademy.com</a>
</aside>

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
# Table of Contents
- [Asynchrony in JavaScript](asynchrony-in-js)
- [Callback-oriented programming](callback-oriented-programming)
  - Simple callbacks
  - "Passing values" in callbacks
  - Example: Geolocation
- [Promises](promises)
  - Overview
  - CommonJS Promise/A and A+
- [Using ES2015 Promises](es2015-promises)
- [Async operations with ES2015 function generators](operations-async)

<!-- section start -->
<!-- attr: { id:'asynchrony-in-js', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
#  Asynchrony in JavaScript
##  How to do it

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- #  Asynchrony in JavaScript -->
- JavaScript is single-threaded
  - Long-running operations block other operations
- Asynchronous operations in JavaScript
  - Break up long operations into shorter ones
  - So other operations can "squeeze in"
  - Delayed execution
  - Postpone heavy operations to<br/>the end of the event loop
  - To give event handlers the ability to respond

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- #  Asynchrony in JavaScript -->
- Browsers provide some asynchronous APIs
  - Web workers
  - AJAX
  - Geolocation
  - CSS3 animations, etc.
- All of the above require callbacks
  - Functions to call at some point
  - When beginning to do work
  - After the work is done to transmit values

<!-- section start -->
<!-- attr: { id:'callback-oriented-programming', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Callback-oriented Programming
## with JavaScript -->

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Callback-oriented<br/>Programming
- Callback function
  - A function object passed to **another function**
  - **The other function** can call the passed one
  - **The other function** can give arguments
- Examples of callbacks:
  - Event handlers are sort-of callbacks
  - **setTimeout** and **setInterval** take a callback argument
  - Some OOP patterns use callbacks for `super`

<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Simple Callback -->
## [Demo](demos/1.%20callbacks/1.1.%20simple-callback.html)

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
<!-- # Callback-oriented<br/>Programming -->
- Callback-oriented programming
  - Functions get passed to each other
  - Each functions calls the passed ones
    - To continue the work
    - To process values
  - Inversion of control principle
    - "Don't call us, we'll call you"
  - Problems:
    - "Return" values by passing to other functions
    - Heavily nested functions are hard to understand
    - Errors and exceptions are a nightmare to process

<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Callback with Value Needed by Other Method -->
## [Demo](demos/1.%20callbacks/1.2.%20callback-value.html)

<!-- attr: { class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Using Browser-provided Async APIs
## How to access browser APIs asynchronously -->

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Using Browser-provided Asynchronous APIs
- How do asynchronous browser APIs work?
  - JavaScript runs in one thread of the browser
  - The browser can create other threads
  - For its own needs, including async APIs
- How do we use asynchronous APIs with JS?
  - Request some browser API
  - Pass arguments for what you want
  - Provide callback methods to execute when the API has processed your request

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
<!-- # Using Browser-provided Asynchronous APIs -->
- Using the Geolocation API
  - Locating the device takes time
  - To request the current position
  - Call:
```js
navigator.geolocation.getCurrentPosition
```
  - Pass in a success and error handler
    - i.e. pass in callback functions
  - Process the data
  - Visualize it accordingly

<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Callback-based usage of the Geolocation API -->
## [Demo](/demos/1.%20callbacks/1.4.%20geolocation-heavy-callbacks.html)

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
# Summary on callback-based usage of Geolocation
- We need some function nesting
  - We want to have good function cohesion
  - Provide separate functions for different operations
- What will happen with a larger application?
  - Lots of levels of nesting
  - Nightmarish error-handling
  - Errors are easy to get lost
  - Handling needs to happen in inappropriate places

<!-- section start -->
<!-- attr: { id:'promises', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Promises
## The evolution of Callback-oriented programming
## (switch on your imagination) -->

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Promises
- A promise is an object which represents an eventual (future) value
  - Methods "promise" they will `return` a value
  - Correct or representing an error
- A Promises can be in one of three states:
  - Fulfilled (resolved, succeded)
  - Rejected (an error happened)
  - Pending (unfulfilled yet, still being computed)

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Promises -->
- Promise objects can be used in code as if their value is known
  - Actually we attach code which executes
  - When the promise is fulfilled
  - When the promise is rejected
  - When the promise reports progress (optionally)
- Promises are a pattern
  - No defined implementation, but strict requirements
  - Initially described in **CommonJS Promises/A**

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
<!-- # Promises -->
- More specifically:
  - Each promise has a `.then()` method accepting 3 parameters:
  - `Success`, `Error` and `Progress` functions
  - All parameters are optional
  - So we can write:

```js
promiseMeSomething()
  .then(function (value) {
  //handle success here
  }, function (reason) {
  //handle error here
  });
```
- _Note_: Provided `promiseMeSomething` returns a promise <!-- .element: style="font-size: 0.8em" -->

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.95em' } -->
<!-- # Promises -->
- Each `.then()` method returns a promise in turn
  - Meaning promises can be chained:

```js
asyncComputeTheAnswerToEverything()
  .then(addTwo)
  .then(printResult, onError);
```
- Promises enable us to:
  - Remove the callback functions from the parameters and attach them to the `"result"`
  - Make a sequence of operations happen
  - Catch errors when we can process them

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Promises -->
- The full and modern description of Promises:
  - [CommonJS Promises/A](http://wiki.commonjs.org/wiki/Promises/A)
  - [CommonJS Promises/A+](http://promises-aplus.github.io/promises-spec/)
     - An improvement of the Promises/A description
     - Better explanation of border cases
  - Several libraries fulfill the Promises spec:
  - [bluebirdjs](http://bluebirdjs.com) -  use as polyfill if no ES2015

<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Promises -->
## [Demo](/demos/2.%20promises/2.1.%20promise-creation.js)

<!-- section start -->
<!-- attr: { id:'es2015-promises', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# ES2015 Promises <!-- .element: style="margin-top: 15%" -->
<!-- <img class="slide-image" showInPresentation="true"  src="imgs/why-so-asynchronous.jpg" style="border:none; position:absolute; top:35; left:25%; width: 50%" /> -->

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.8em' } -->
<!-- # ES2015 Promises -->
- Constructor

```js
var promise = new Promise(function(resolve, reject) {
  // do a thing, possibly async, then...
  if (/* everything turned out fine */) {
    resolve('Stuff worked!'); // or pass some data
  } else {
    reject(Error('It broke'));
  }

  return promise; // give this to someone
});

```

- What can we do `async`
  - AJAX
  - Web Sockets - load image
  - Write LOTS to DOM
  - Others..

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # ES2015 Promises -->
```javascript
var promise = new Promise(function(resolve, reject) {
  // do something
  if (somethingWorked()) {
    resolve('Stuff worked!');
  } else {
    reject(Error('It broke'));
  }
});

promise.then((result) => {
  console.log(result); // "Stuff worked!"
}, (err) => {
  console.log(err); // "It broke"
}
```

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # ES2015 Promises -->
```js
function get(url) {
  return new Promise((resolve, reject) => {
    // jQuery http get request
    $.get(url, (data) => {
      resolve(data);
    })
    .fail(() => {
      reject();
    });
  });
}
```
```js
// in code
get('users.all').then((users) => {
  myController.users = users;
}, function() { // OR .catch(function() {
  delete myController.users;
})
```

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Promise chaining
- When server returns a JSON string

```js
get('users.all')
  .then(function(usersString) {
    return JSON.parse(usersString);
  })
  .then(function(users) {
    myController.users = users;
  })
```

- Or

```js
get('users.all')
  .then(JSON.parse)
  .then((users) => { myController.users = users })
```

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
# Promises: Exapmles
- Promises - async example

```js
var async = false;
var promise = new Promise((resolve, reject) => resolve());

promise.then(() => console.log(async)); // true
async = true;
```

- Promise composing

```js
var promise1 = new Promise((resolve, reject) => resolve('one'))
var promise2 = new Promise((resolve, reject) => resolve(promise1))

promise2.then((data) => console.log(data)) // 'one'
```

<!-- section start -->
<!-- attr: { id:'promise-methods', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Promise methods

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Promise methods -->

- `Promise.all(`_iterable_`)`
  - Wait until all settled
- `Promise.race(`_iterable_`)`
  - Wait until 1 settles
- `Promise.reject(`_reason_`)`
  - Create a Promise that is already rejected
  - Useful to not do async operation in some condition
- `Promise.resolve(`_value_`)`
  - Create a promise that is already resolved

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# `Promise.all()`

```js
var usersPromise = get('users.all');
var postsPromise = get('posts.everyone');

// Wait until BOTH are settled
Promise.all([usersPromise, postsPromise])
  .then((results) => {
  // results is an array of the responses
    myController.users = results[0];
    myController.posts = results[1];
  })
  .catch(() => {
    delete myController.users;
    delete myController.posts;
  })
```

<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Promise methods -->
## [Demo](/demos/2.%20promises/2.4.%20promise-all.js)

<!-- attr: { class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Import modules with Promises

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.95em' } -->
<!-- # Import modules</br>with Promises -->

```js
System.import('some_module')
  .then(some_module => {
    // work with the module
  })
  .catch(error => {
    // process error
  })
```

- Multiple promisses at once

```js
Promise.all(['module1', 'module2', 'module3'])
  .map(x => System.import(x))
  .then(([module1, module2, module3]) => {
    // my code...
  })
```

<!-- section start -->
<!-- attr: { id:'function-generators', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Function generators
## new to EcmaScript 2015

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
# Async operations

- Once the function starts running, it will always run to completion before any other JS code can run

```js
setTimeout(() => {
  console.log("Hello World");
}, 1);

(function foo() { // never do loops like this
  for (var i = 0; i <= 1E10; i += 1) {
    console.log(i);
  }
})();
// 0..1E10
// "Hello World"
```

- JavaScript is always single-threaded
  - Only one command/function executing at any given time

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
# Function generators
- Different kind of function
  - May be paused in the middle
  - One or many times and resumed later
  - Allowing other code to run during these paused periods
- ES2015 generator functions are **cooperative** in their concurrency behavior
  - It pauses itself when it comes across a `yield`
  - It cannot resume on its own
- Enables 2-way message passing
  - Send messages **out** with each `yield`
  - Send messages **in** with each restart

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Function generators -->
- A function becomes a generator if:
  - Contains one or more `yield` expressions
  - Uses the `function*` syntax

```js
function *foo() { // OR function* foo() {
  // .. yield something
}
```

- `yield` expression (not a statement)
  - Send value **out** and stops execution
  - Takes value back **in** when function is restarted

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Function generators<br/>Examples -->

```js
function *foo() {
    var x = 1 + (yield "foo");
    console.log(x);
}
```

```js
function foo(x) {
    console.log("x: " + x);
}

function *bar() {
    yield; // just pause
    foo( yield );
  // pause waiting for a parameter to pass into `foo(..)`
}
```

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Generator Iterator
- Step through an ordered set of values one at a time by calling `next()`

```js
function *foo(){
// OR function *genFun(){
  yield 1;
  yield 2;
  yield 'ivan';
  yield {name: 'stamat'};
}

var it = foo();
it.next(); // { value:1, done:false }
it.next(); // { value:2, done:false }
it.next(); // { value:'ivan', done:false }
it.next(); // { value:{name: "stamat"}, done:false }
it.next(); // { value:undefined, done:true }
```

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Generator Iterator<br/>Examples -->

```js
function *foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    return 5;
}

for (var v of foo()) {
    console.log( v );
}
// 1 2 3 4
```
<!-- .element: style="float:left; width: 45%; margin-right: 20px" -->

```js
function *idMaker(){
  var index = 0;
  while(true)
    yield index++;
}

var gen = idMaker();

gen.next().value; // 0
gen.next().value; // 1
gen.next().value; // 2
```
<!-- .element: style="float:left; width: 45%" -->

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Advanced function<br/>generators

```js
function* fibonacci(){
  var fn1 = 1, fn2 = 1, currnet, reset;
  while (true){
    current = fn1;
    fn1 = fn2;
    fn2 = fn2 + current;
    reset = yield current;
    if (reset){
        fn1 = 1;
        fn2 = 1;
    }
  }
}

var sequence = fibonacci();
sequence.next(true).value;     // 1
```

<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Function generators -->
## [Demo](/demos/3.%20function-generators/)

<!-- section start -->
<!-- attr: { id:'operations-async', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Async operations
## with function generators

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Async operations with<br/>ES2015 function generators -->

- Fantastic for controlling async code
- Function generators can be used to execute step-by-step async calls
  - Example: Upload multiple files asynchronously one at a time
  - Needs a wrapper function to call `.next()`

<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Async operations with ES2015 -->
## [Demo](/demos/4.%20async%20operations)

<!-- section start -->
<!-- attr: { id:'questions', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Promises and Asynchronous Programming
## Questions -->

<!-- attr: { showInPresentation: true, hasScriptWrapper: true, style:'font-size: 0.9em' } -->
# Free Trainings<br/>@ Telerik Academy
- "Web Design with HTML 5, CSS 3 and JavaScript" course @ Telerik Academy
    - [javascript course](http://academy.telerik.com/student-courses/web-design-and-ui/javascript-fundamentals/about)
  - Telerik Software Academy
    - [telerikacademy.com](https://telerikacademy.com)
  - Telerik Academy @ Facebook
    - [facebook.com/TelerikAcademy](https://facebook.com/TelerikAcademy)
  - Telerik Software Academy Forums
    - [forums.academy.telerik.com](https://telerikacademy.com/Forum/Home)
