<!-- section start -->

<!-- attr: {id: 'title', class: 'slide-title', hasScriptWrapper: true} -->

# Simple SPA Apps with Sammy.js and jQuery
## With routes, AJAX and stuff
<div class="signature">
    <p class="signature-course">JavaScript Applications</p>
    <p class="signature-initiative">Telerik Software Academy</p>
    <a href="http://academy.telerik.com" class="signature-link">http://academy.telerik.com</a>
</div>

<!-- section start -->

<!-- attr: {style: 'font-size: 44px', id: 'table-of-contents'} -->
# Table of Contents
- SPA Apps Overview
  - What is a SPA app?

- Sammy.js Overview
  - Sammy.js Config
  - Creating Routes

- Sammy.js and jQUery
  - Creating a simple SPA app
  - <!-- section start -->

<!-- attr: {class: 'slide-section', id: 'spa-apps-overview', style: 'font-size:45px'} -->

# Single Page Applcations Overview
## Many pages in a single page?!
# SPA Apps Overview
- SPA apps are WEB applications with a single HTML file
  - Yet, they have many fake pages
    - Each page is dynamically created with JavaScript

- The routes of SPA apps mimic the common urls of WEB applications:
  - `.../#/home` instead of `.../home.php`
  - `.../#/media` instead of `.../Media.aspx`

- Navigation is done with **links between different urls**

# SPA Apps Frameworks
- There are so many frameworks for creating SPA apps
  - Complete frameworks:
    - [Telerik KendoUI](http://),
    - [AngularJS](http://angulae)
    - [Ember.js](http://)
    - [Backbone](http://)
    - [Durandal](http://durandaljs.com/)
    - [BatmanJS](http://batmanjs.org/)
    - Partial app features:
    - [Sammy.js](http://sammyjs.org)
    - [jQuery](http://jquery.com)
    - [Knockout](http://knockoutjs.com/)
    - And many more
    - <!-- section start -->

<!-- attr: {class: 'slide-section', id: 'sammy-js-overview'} -->

# Sammy.js Overview
## A basic framework for SPA Apps
<!-- attr: {hasScriptWrapper: true} -->

# Sammy.js Overview
- Sammy.js is a basic framework for creating SPA apps
  - Easy to use
  - Creates routes that map to the HTTP requests

  ```javascript
  var sammyApp = Sammy('#root', function() {

    this.get('#/', function(){
      this.redirect('#/home');
    };

    this.get('#/home', function(){
      alert('You are on the `home` page!');
    });

    this.get('#/details', function(){
      alert('You are on the `details` page!');
    });
  });
  sammyApp.run('#/');
  ```

# Sammy.js: Creating Routes
- Each route maps to the provided url
  - Appending the route to the base url

- _Example_
  - The app is running at
  - [http://my-server.com/index.html](http://my-server.com/index.html)
  - The route is:
  - this.get('#/home', cb);
  - This maps to
  - [http://my-server.com/index.html/#/home](http://my-server.com/index.html/#/home)
  - <!-- attr: {class: 'slide-section'} -->


# Sammy.js: Sample Routes
## Live Demo
<!-- section start -->

<!-- attr: {class:'slide-section', id: 'sammyjs-route-types'} -->

# Sammy.js: Types of Routes
## What routes can be mapped?
# Sammy.js Types of Routes: Query Params
- Default route: `#/items`
  - Can have query params: `#/items?name=John&age=19`

- _Example:_
  - Maps to `#/items` and `#/items?name=John`:
  - this.get('#/items', function(){
  - var name = params.name || '';
  - });
  - <!-- attr: {class: 'slide-section'} -->


# Sammy.js: Default Routes with QueryParams
## Live Demo
<!-- attr: {hasScriptWrapper: true} -->

# Sammy.js Types of Routes: Params in url
- Route with params in the url: `#/items/:id`
  - Maps to `#/items/123`, `#/items/this_is_some_id`:
  - this.get('#/items/:id', function(){
  - var id = params.id || '';
  - });
  - <!-- attr: {class: 'slide-section'} -->


# Sammy.js: Routes with params in the URL
## Live Demo
<!-- section start -->

<!-- attr: {class: 'slide-section', id: 'sammyjs-jquery'} -->

# Sammy.js and jQuery
## How do they work together?
# Sammy.js and jQuery
- Sammy.js is built on jQuery
  - Every app with Sammy includes jQuery

- _Example_ listing items with jQuery in Sammy.js

```javascript

this.get('#/items', function() {
    data.get().then(function(res) {
        var items = res.result;
        //show all items, with links to #/items/:id
    });
});

this.get('#/items/:id', function() {
    data.getById(this.params.id).then(function(res) {
          var item = res.result;
          //show concrete item
      });
})
```

<!-- attr: {class: 'slide-section'} -->
# Sammy.js and jQuery
## Live demo

<!-- section start -->

<!-- attr: {class: 'slide-questions', id: 'questions'} -->

# Simple SPA Apps with Sammy.js and jQuery
## Questions
