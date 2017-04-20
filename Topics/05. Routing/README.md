<!-- section start -->
<!-- attr: { id:'title', class:'slide-title', hasScriptWrapper:true } -->

# Simple SPA Apps with Sammy.js and jQuery
## With routes, AJAX and stuff
<div class="signature">
    <p class="signature-course">JavaScript Applications</p>
    <p class="signature-initiative">Telerik Software Academy</p>
	<a href="https://telerikacademy.com" class="signature-link">https://telerikacademy.com</a>
</div>


<!-- attr: { hasScriptWrapper:true } -->
# Table of Contents
- [SPA Apps Overview](#spa-apps-overview)
  - What is a SPA app?
- [Simple routing with a jQuery plugin](#jquery-routing-overview)
  - Configuration
  - Creating Routes
- [Creating a simple SPA app](#simple-spa)


<!-- section start -->
<!-- attr: { id:'spa-apps-overview', class:'slide-section' } -->
# Single Page Applcations Overview
## Many pages in a single page?!


# SPA Apps Overview
- SPA apps are WEB apps with a single HTML file
  - Yet, they have many fake pages
    - Each page is **dynamically created with JavaScript**
- The routes of SPA apps mimic the common URLs of WEB applications:
  - `.../#/home` instead of `.../home.php`
  - `.../#/media` instead of `.../Media.aspx`
- Navigation is with **links between different urls**

# Why JavaScript Routing?
- Browser apps sometimes lose:
  - Proper handling of the browser's **back button**
  - The ability to **deep link**
  - Takes **time to load** a complex in-browser app
    - Initializing objects, functions, event handlers
- Routing is a way of organizing and managing application states
- But **finding/fetching** the right data and **right view** is the responsibility of the browser app


<!-- attr: { hasScriptWrapper:true, style:'font-size:0.9em'} -->
# SPA Apps Frameworks
- There are so many frameworks for creating SPA apps
  - Complete frameworks:
    - [Telerik KendoUI](http://www.telerik.com/kendo-ui)
    - [AngularJS](https://angularjs.org/)
	- [Angular](https://angular.io/)
    - [Ember.js](https://emberjs.com/)
    - [Backbone](http://backbonejs.org/)
    - [Durandal](http://durandaljs.com/)
    - [BatmanJS](http://batmanjs.org/)
  - Partial app features:
    - [Sammy.js](http://sammyjs.org)
    - [jQuery](https://jquery.com/)
    - [Knockout](http://knockoutjs.com/)
    - ... and many more

<!-- section start -->
<!-- attr: { id:'jquery-routing-overview', class:'slide-section', hasScriptWrapper:true } -->

# Routing Libraries Overview
## Routing for a basic SPApp

<!-- attr: { hasScriptWrapper:true, style:'font-size:0.9em'} -->
# jQuery plugin Overview
- Basic libraries for creating routing
  - Easy to use
  - Create routes that map to the HTTP requests

- [Navigo](https://github.com/krasimir/navigo) - [A modern JavaScript router in 100 lines](http://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url)

```js
var router = new Navigo(null, false); // (root, useHash)
router.on('book/:id/note/:noteId', params => loadBook(params))
    .resolve();
```
- [Page](https://visionmedia.github.io/page.js)

```js
page('/', index)
page('/user/:user', show)
page('/user/:user/edit', edit)
```

<!-- attr: { hasScriptWrapper:true, showInPresentation:true, style:'font-size:0.95em'} -->
# Using Navigo
- Installation

```npm
npm install navigo
```
- and

```html
<script src="./node_modules/navigo/lib/navigo.js">< script/>
```

- Initializing

```js
const router = new Navigo(root = null, useHash = false);
```

<!-- attr: { hasScriptWrapper:true, showInPresentation:true, style:'font-size:0.95em'} -->
# Navigo: Creating Routes
- Each route maps to the provided URL
  - Appending the route to the base URL
- _Example_:
  - The app is running at
    - http://my-server.com/index
  - The route is:
```js
router.on('/home', callback)
```
  - This maps to
      - [http://my-server.com/index.html/#/home](http://my-server.com/index/#/home)


<!-- attr: { hasScriptWrapper:true, showInPresentation:true, style:'font-size:0.95em'} -->
# Navigo: Routes
- Multiple routes
  - In this case ordering matters

```js
router.on('/products/list', () => { ... })
      .on('/clients/list', () => { ... })
      .resolve();
```
  - In this case ordering **does not** matters

```js
router.on({
  '/products/:name': () => { ... }, 
  '/products': () => { ... }
})
      .resolve();
```

<!-- attr: { hasScriptWrapper:true, showInPresentation:true, style:'font-size:0.95em'} -->
# Navigo: Routes
- Main/root handler

```js
router.on(function () { // show home page here }).resolve();
```
- Parameterized URLs

```js
router.on('/user/:id/:action', function (params) {
    // If we have http://site.com/user/42/save as a url then
    // params.id = 42  // params.action = save
  }).resolve();
```
- Changing/navigating to page

```js
router.navigate('/products/list');
```

<!-- attr: { class:'slide-section demo', hasScriptWrapper:true, } -->
# Sample Routes
## [Demo](./demos/sample-routes/)


<!-- section start -->
<!-- attr: { class:'slide-section', hasScriptWrapper:true } -->
# Types of Routes
## What routes can be mapped?


<!-- attr: { hasScriptWrapper:true, showInPresentation:true } -->
# Types of Routes:<br/>Params in URL
- Route with params in the URL: `#/items/:id`
  - Maps to `#/items/123` and `#/items/this_is_some_id`

```js
router.on('items/:id', (params) => {
  var id = params.id || '';
});
```

<!-- attr: { hasScriptWrapper:true, hasScriptWrapper:true, style:'font-size:1em'} -->
# Types of Routes:<br/>Query Params
- Default route: `#items`
  - Can have query params: `#items?name=John&age=19`
- _Example:_
  - Maps to `#items` and `#items?name=John`:

```js
router.on('items', (params) => {
  var name = getQueryParams().name;
});
```

<!-- attr: { class:'slide-section demo' } -->
# Default Routes with Query Params
## [Demo](./demos/getting-query-params/)


<!-- section start -->
<!-- attr: { id:'simple-spa', class:'slide-section', hasScriptWrapper:true, showInPresentation:true } -->
<!-- # Routing and AJAX
## How do they work together? -->

<!-- attr: { hasScriptWrapper:true, showInPresentation:true } -->
# Simple SPA
- _Example_: Listing items

```js
router.on('items', () {
    data.items.get().then(function(res) {
        var items = res.result;
        //show all items, with links to items/:id
    })
}).on('items/:id', (params) => {
    data.getById(params.id)
      .then(function(res) {
          var item = res.result;
          //show specific item
      });
})
```

<!-- attr: { class:'slide-section demo' } -->
# Simple SPA
## [Demo](./demos/simple-SPA/)

<!-- section start -->
<!-- attr: { id:'questions', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Questions
## Simple SPA Apps with<br/>Routing and jQuery AJAX 

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
