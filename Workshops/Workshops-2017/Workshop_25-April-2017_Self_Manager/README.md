# Academy Self Manager - JavaScript Applications Sample Exam

##  Description:

Implement a SPA application for creating TODOs and scheduling events

* Users can be registered and signed in the application
  * Users provide username and password
  * On login/register they receive an authorization key
    * It is used for all other operations

* Signed in users can:
  * Create TODOs:
    * Create a TODO
    * List all their TODOs
    * Change the state of a TODO
  * Create events:
    * Create event
    * List all their events

* TODOs:
  * Each TODO has **text**, **state** and **category**
* Events:
  * Each event has **title**, **description**, **date**, **category** and **an array of users**
    * The users are the users that are added to the event

## Routes

Implement the following routes

* `#/home` - returns a home page
  * Can contain any content of your choice
* `#/todos` - shows a list of all todos for a logged in user
* `#/events` - shows a list of all events for a logged in user

##  Requirements:

* Use **bower** to download all the libraries
  * **Missing libraries from bower.json will be sanctioned**
  * It will be easier for the reviewers of your exam
* Obligatory use the following libraries
  * **jQuery** and **Handlebars**
* You may use:
  * Underscore.js
  * Sammy.js
  * toastr
  * jQueryUI
  * KendoUI UI components - autocomplete, dropdown, grid, etc...
  * Any other library that provides a small functionality
* You may **NOT** use:
  * Any framework that provides functionality for a complete SPA apps
    * AngularJS
    * KendoUI framework
      * Data-binding, routing, etc...
    * Backbone.js
    * Ember.js
    * Durandal
    * Knockout.js
    * Any other complete SPA framework
