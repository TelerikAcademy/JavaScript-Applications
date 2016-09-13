# Fortune Cookies Exam Quetions

## Functionality (up to 35 points)

### Users (up to 10 points)

*   Registering users (up to 2)
*   Login users (up to 2)
*   User login is persistent(works  after closing and reopening the browser) (up to 2)
*   Logout users (up to 2)
*   Hashing the password (up to 2)

### Fortune Cookies (up to 20 points)

*   Showing all fortune cookies (up to 2)
*   Sorting fortune cookies by date (up to 2)
*   Sorting fortune cookies by likes (up to 2)
  *   likes, likes-dislikes, likes*likes/sqrt(dislikes)
*   Filter by category (up to 3)
  * Show on different route
  * or filter in an input with auto complete
  * or drop-down
  * hide DOM elements (1 point)
* Share a fortune cookie (up to 2)
  * With text, category and optional image
* Reshare a fortune cookie (up to 4)
* Like fortune cookie (up to 3)
* Dislike fortune cookie (up to 2)

### Hourly Fortune cookie (up to 3 points)

* Show it (up to 3)

### Bonus (up to 2)

* Categories shown from the server (up to 2)
  * Using the api/categories endpoint

## Routes implemented (up to 10 points)

* Route `#/` redirects to `#/home`(up to 1)
* Route `#/home` shows fortune cookies (up to 2)
* Route `#/home?category=CCC` shows only fortune cookies with this category (up to 3)
* Route `#/my-cookie` - .... (up to 2)

### Bonus
* New route for creating cookies (up to 2)
  * or popup/modal for creating cookies

## Validation (up to 12 points)

* Username
  * A string (up to 1)
  * Has length between 6 and 30 (up to 1)
  * Can contain only Latin letters, digits and the characters '\_' and '.' (up to 1)
* Fortune Cookie Text
  * A string (up to 1)
  * Has length between 6 and 30 (up to 1)
  * Can contain any characters (up to 1)
* Fortune Cookie Category
  * A string (up to 1)
  * Has length between 6 and 30 (up to 1)
  * Can contain any characters (up to 1)
* Fortune Cookie Img
  * A string (up to 1)
  * Must be a valid url address (up to 2)

## Usability (up to 14 points)

* Clear way to list fortune cookies (up to 2)
* Navigation (up to 1)
* Hide buttons for Login/logout (up to 1)
* Hide `#/my-cookies` for not logged in users (up to 1)
  * or redirect to `#/home`/`#/login`
* Easy way to add categories (up to 1)
* Success/Error notifications for every operation (up to 1)
* Show like/dislike buttons for each fortune cookie (up to 1)
* Show share button for each fortune cookie (up to 1)
* Show likes and dislikes count (up to 1)
* Showing image for each fortune cookie (up to 1)
* Showing dates in a clear way (up to 1)

### Bonus (up to 2)

* Show the user, that created the fortune cookie (up to 2)

## Code quality (up to 18)

* Separate object for creating AJAX requests (up to 5)
  * i.e. `data` object
* Using promises (up to 3)
* Separate object for loading handlebars templates/views (up to 2)
* Abstract way to handle AJAX requests (up to 4)
  * i.e. using it, does not couple with jQuery AJAX
* Separate object for saving authentication key (up to 2)
* Separate object for validation (up to 2)
  * Reusing the methods 

## Libraries (up to 11 points)

* Using jQuery for AJAX requests (up to 2)
* Using Handlebars for all templates/views (up to 2)
* Using jQuery for event handling (up to 2)
* Using jQuery for DOM manipulations (up to 1)

### Bonus (up to 4 points)
*  Using module loader (up to 1)
  * System.js or Require.js or other
*  Using Sammy.js for routes (up to 1)
*  Using Underscore.js/Lodash (up to 1)
*  Using library for hashing passwords (up to 1)
