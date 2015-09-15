# Fortune Cookies
JavaScript Applications Exam, 10 September 2015

Implement a SPA application for fortune cookies.

**Find solution at https://fortune-cookies-demo.herokuapp.com/** 

## Application description

The application must provide the following functionality

* **Users** can **Register**, **Login** and **Logout** in the application
	* _Users provide `username`  and `password`_
* **Logged-in users** can:
	* **Share** a new fortune cookie
		* Providing `text` and `category`
	* **Re-share** an existing fortune cookie
		* This can be either:
			* A fortune cookie, shared by this user
			* A fortune cookie, shared by other user
	* **Like** or **dislike** a fortune cookie
	* **Get** their hourly fortune cookie
		* A random cookie from all shared cookies
		* This cookie is changed every hour
			* i.e. if the user asks for their fortune cookie at 11:30 and then again at 11:45, their fortune cookie will be the same
			* or if the user asks for their fortune cookie at 11:30 and then again at 12:00, the two fortune cookies may be different
				* It depends on the total count of fortune cookies
* **All users** (even not logged in) can **see** fortune cookies, that are shared by any user
* **Cookies** can be:
	* Sorted by `likes` or `shareDate`
	* Filtered by a single `category`
		* i.e. show only the fortune cookies in a given `category`

## Application routes

Implement at least the following routes in your app:

* `#/`
  * Redirects to `#/home`
* `#/home`
  * Shows all fortune cookies
    * Available to all users, logged-in or not
    * Provides a way to sort the cookies by `likes` or `shareDate`
    * Provides a way to filter fortune cookies by `category`
* `#/home?category=CCCC`
  * Shows only the fortune cookies in category **CCC**
* `#/my-cookie`
  * Shows the current hourly fortune cookie for the logged-in user


## Application requirements

**Mandatory** provide a good **User Experience(UX)**
  * No need to be pretty, just usable
    * Please do not make your colleagues wonder where to click, to share a fortune cookie

**Mandatory** use extensively the following libraries:

* jQuery
  * For AJAX
  * For DOM manipulation
* Handlebars.js
  * For view templates

**Do NOT** use any of the following:
* AngularJS
* KendoUI framework
  * Data-binding, routing, ViewModels, etc...
* Durandal
* Backbone.js
* Ember.js
* Batman.js

You can use libraries for:
* Notifications
  * toastr or any other
* UI components
  * jQueryUI, KendoUI UI components, Twitter Bootstrap
* Utils frameworks:
  * Moment, Underscore/Lodash
  * Libs for encryption
  * etc...
* Routers
  * Only Sammy.js is allowed
* Module loading
  *	System.js, RequireJS or other

## Server routes

### Users

* `api/users`
  * GET
    * **Returns** all users
  * POST
    * **Registers** a new user
    * Needs **username** and **passHash** to be sent in the body of the request
* `api/auth`
  * PUT
    * **Logs in** an user
    * Needs **username** and **passHash** to be sent in the body of the request
	* If the request is valid returns **username** and **authKey**

### Fortune Cookies

* `api/cookies`
  * GET
    * **Returns** all shared fortune cookies
  * POST
    * **Shares** or **re-shares** a new fortune cookie
	* User must be **logged-in**
    * Needs **text**, **category**, **img** to be sent in the body of the request and the current user's **authKey** as a header with name: `x-auth-key`
      * `img` is a string to an online image
      * `img` is optional and if not sent, a **default batman** image will be provided
* `api/cookies/:id`
  * PUT
    * **Likes** or **dislikes** a fortune cookie
    * Needs `type` to be sent in the body of the request
      * `type` can only have values 'like' or 'dislike'

###	My Fortune Cookies

* `api/my-cookie`
  * GET
    * **Returns** the hourly fortune cookie

###	Categories
*	`api/categories`
	*	GET
		*	**Returns** an array with all categories

## Deliverables

* **ZIP** all your code, including the server
  * Remove only the `node_modules` folder
* Send the ZIP file on the page, provided in http://telerikacademy.com

## Constraints and validation
* Username
  * A string
  * Has length between 6 and 30
  * Can contain only Latin letters, digits and the characters '\_' and '.'
* Fortune Cookie Text
  * A string
  * Has length between 6 and 30
  * Can contain any characters
* Fortune Cookie Category
  * A string
  * Has length between 6 and 30
  * Can contain any characters
* Fortune Cookie Img
  * A string
  * Must be a valid url address
