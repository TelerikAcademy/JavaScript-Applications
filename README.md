# JavaScript-Applications
JavaScript Applications Course Repository

The **JavaScript Applications** course introduces first steps for build web front-end application, using a back-end server (Node.js/Business clouds/etc...). The topics covered include HTTP, AJAX (both native and with frameworks), asynchronous paradigms using callbacks and promises and more...

All homeworks for the course are test-driven, i.e. each task has a predefined set of unit tests. [Here](https://github.com/TelerikAcademy/JavaScript-UI-and-DOM/blob/master/README.md#user-content-preparing-the-local-machine-for-unit-testing-with-mocha-and-chai)  you can find information how to setup your machine for local testing

## Course Program
#### 1. Course Introduction [(view online)](https://rawgit.com/TelerikAcademy/JavaScript-Applications/master/01.%20Javascript%20Applications%20-%20Course%20Introduction/slides/index.html)
*   Examination
*   Trainers
*   Course program
*   Tools needed for the course
	*   Code Editors: Sublime text/Atom.io/Visual Studio Code/Web Storm
	*   Platforms: Node.js and JavaScript IO
	*   Servers: Microsoft IIS, WAMP, MAMP, XAMPP

#### 2.   Best practices for writing JavaScript [(view online)](https://rawgit.com/TelerikAcademy/JavaScript-Applications/master/02.%20Best%20practices%20for%20writing%20JavaScript/slides/index.html)
*   Naming in JavaScript
*   Global scope
*   What is the value of `this`?
*   Function and "block" scopes
	*   `var` and `let`
*   `use strict`
*	JavaScript Execution

#### 3.	AMD and SystemJS [(view online)](https://rawgit.com/TelerikAcademy/JavaScript-Applications/master/03.%20AMD%20and%20SystemJS/slides/index.html)
*		[Asynchronous Module Definition (AMD)](https://github.com/amdjs/amdjs-api/blob/master/AMD.md)
*   Creating modules with [SystemJS](https://github.com/systemjs/systemjs)
*   Loading modules
*   Creating dependencies
*   Supported types of modules

#### 4.		Underscore.js Overview [(view online)](https://rawgit.com/TelerikAcademy/JavaScript-Applications/master/04.%20Underscore.js%20overview/slides/index.html)
*	What is [Underscore.js](http://underscorejs.org)?
*   Collections and Array extensions:
	*   `_.map()`, `_.each()`, `_.pluck()`, `_.sortBy()`, `_.groupBy()`, `_.first()`, `_.last()` etc...
*   Function extensions:
	*   `_.memoize()`, `_.compose()`
*   Object extensions:
	*   `_.keys(obj)`, `_.values(obj)`, `_.extend(obj, props)`
*   Utility functions:
	*   `_.times(count, callback)`, `_.mixin(obj)`
*   Templates
*   Chaining

#### 5.   Web Storages [(view online)](https://rawgit.com/TelerikAcademy/JavaScript-Applications/master/05.%20Web%20Storages/slides/index.html#/title)
*   `localStorage`
*   `sessionStorage`
*   `cookies`
*   Polyfills for `localStorage` and `sessionStorage`

#### 6.   Promises and asynchronous programming [(view online)](https://rawgit.com/TelerikAcademy/JavaScript-Applications/master/06.%20Promises%20and%20asynchronous%20programming/slides/index.html)
*   Async programming
*   Callbacks
*   Promises
	*	Native with polyfill
	*	Using a library: Bluebird, RSVP, Q
*   Async operations with ES 2015 function generators

#### 7.   HTTP and AJAX [(view online)](https://rawgit.com/TelerikAcademy/JavaScript-Applications/master/07.%20HTTP%20and%20AJAX/slides/index.html#/title)
*   What is HTTP?
*   Request-response model
*   HTTP Methods
*   HTTP request:
    *   Headers
    *   Body
    *   Methods
*   HTTP response
    *   Headers
    *   Body
*   AJAX
    *   AJAX principle
    *   Performing AJAX
    *   Types of data
        *   HTML, XML/RSS, plain text, JSON

#### 8.   Consuming web services and AJAX
*   Creating HTTP requests using:
	*   Native JavaScript
	*   jQuery.ajax
*   Build UI based on received data from a web service

#### 9.   Business clouds for persistent data
*   Creating an application with a ready-to-use server
*   Samples:
	*   [Telerik Backend Services](http://www.telerik.com/backend-services)
	*   [Parse](https://www.parse.com/)
	*   [Microsoft Mobile App Services](http://azure.microsoft.com/en-us/services/app-service/mobile/)

#### 10.   Unit testing with Mocha & Chai
*   Setup of Mocha and Chai
*   [Mocha reporters](https://mochajs.org/#reporters)
*   Unit testing DOM
	*   With [jsdom](https://github.com/tmpvar/jsdom)
	*   With [PhantomJS](http://phantomjs.org/)
*   Setting up Mocha with Karma
*   Spy objects and mocking
*   Code coverage with [Istanbul](https://github.com/gotwarlost/istanbul)

#### 11. Creating Simple SPA applications with Sammy.js and jQuery
*	What is a SPA application?
*	[Sammy.js](http://sammyjs.org/) overview
	*	Creating routes
		*	i.e. 'pages'
	*	Using Templates
		*	Handlebars, Mustache, etc...
*	Creating a simple SPA app using Sammy.js

#### 12.   App architecture workshop
*   Creating a complete web app with:
	*   Backend data from business cloud
	*   AJAX
	*   Handlebars.js, System.js, jQuery
	*   Using promises

#### 13.  Exam preparation

#### 14.  Teamwork Defense

#### 15.  Exam

## Preparing the local machine for Unit testing with Mocha and Chai

* Install [JavaScript I/O](https://iojs.org/en/index.html "JavaScript I/O")
    * Try if it is working by typing in CMD/Terminal `$ iojs -v` (should produce result)

## Preparing for the tests for each homework

*   Checkout the repository for the particular homework
*   Open CMD/Terminal and navigate to the checked-out repository with the homework
*   Run `npm install` in CMD/Terminal
    *   A folder `node_modules` should appear
*   You are ready to run the tests

## Running the tests

*   Navigate to the folder of the particular homework in CMD/Terminal
*   Requirements:
    *   JavaScript files must be called task-1.js, task-2.js etc..
    *   Each .js file must contain `module.exports=[name of the object/function]`
*   Run `npm test`
    *   Test results should appear on the CMD/Terminal

## Upload in [BGCoder.com](http://bgcoder.com/)

*   Go to the specific homework
*   Select the task you will be sending
*   Wrap your result in:

        function solve() {
            return [your solution object/function];
        }
