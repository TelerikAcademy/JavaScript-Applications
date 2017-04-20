<!-- section start -->
<!-- attr: { id:'title', class:'slide-title', showInPresentation:true, hasScriptWrapper:true } -->
# Web Storages
## Cookies, Local and Session Storages
<aside class="signature">
    <p class="signature-course">JavaScript Applications</p>
    <p class="signature-initiative">Telerik Software Academy</p>
	<a href="https://telerikacademy.com" class="signature-link">https://telerikacademy.com</a>
</aside>


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Table of Contents
- [WebStorages](#webstorages)
- [Cookies](#cookies)
- [SessionStorage](#sessionstorage)
- [LocalStorage](#localstorage)

<!-- - Shims for localStorage and sessionStorage -->


<!-- section start -->
<!-- attr: { id:'webstorages', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# WebStorages
## Cookies, Local and Session
			
<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->		
# WebStorages
- WebStorages are places to store data
	- _Example_: Save user settings, so next time the application is opened, they can be loaded
- Three common types of Web Storage
	- **Cookies**
		- Accessible only from a single document
	- **localStorage**
		- Accessible only from a single document
	- **sessionStorage**
		- Accessible only while the document is opened


<!-- section start -->
<!-- attr: { id:'cookies', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Cookies
					

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->		
<!-- # Cookies -->
- 	Cookies are small pieces of data
	- 	Accessible from a concrete application
	- 	Stored in the **user's browsers**
		- 	i.e. different cookies for different browsers
	- 	Cookies can store only **plain text**
					
<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->		
<!-- # Cookies -->
- 	Cookies are used to save some **state of the user preferences and settings**
	- 	If you have authenticated to the server once, it is not necessary to do so again
	- 	Cookies are attached to the headers of every HTTP request to the server
- 	Cookies can be **read** and **set** by **JavaScript**

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:"font-size:0.9em" } -->		
<!-- # Cookies -->
- 	A cookie consists of three parts
	1.	**Name-value pair** - holds the cookie information
    	- The name is used to reach the data stored in the value
    	- To read a cookie, you must search for the name
	2.	**Expiration date**, after which this cookie is not available	3.	
      - Used to give timeframe for the work of the cookie
	    - If not set, the cookie is removed when closing the browser
	    - To make a permanent cookie, set the expiration date after enough years
	3.	**Domain and path to server**, that the cookie belongs to

```
'c1=cookie1; expires=Thu, 30 Apr 2013 21:44:00 UTC; path=/'
```

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Working with Cookies
- 	Cookies can be accessed with JavaScript
	- 	Use `document.cookie` property
	- 	Though cookies are not strings, they are used as strings

```js
//sets a cookie
document.cookie =
 'c1=cookie1; expires=Thu, 30 Apr 2013 21:44:00 UTC; path=/'
//sets another cookie
document.cookie =
 'c2=cookie2; expires=Tue, 29 Apr 2013 11:11:11 UTC; path=/'
//reads all cookies
console.log(document.cookie);
```
<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->		
<!-- # Working with Cookies -->
- 	Read cookie (its information)

```js
function readCookie(name) {
  var allCookies = document.cookie.split(";");
  for (var i = 0; i < allCookies.length; i++) {
    var cookie = allCookies[i];
    for (var j = 0; j < cookie.length; j++) {
      if (cookie[j] !== " ") {
        break;
      }
    }
    cookie = cookie.substring(j);
    if (cookie.startsWith(name + "=")) {
      return cookie;
    }
  }
}
```
	
<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Cookies -->
## [Demo](/demos/1.%20cookies.html)

<!-- <img class="slide-image" showInPresentation="true" src="imgs/cookie-monster.png" style="border:none; background:none; box-shadow:none; position:absolute; bottom:-5%; right:0%;" />	-->



<!-- section start -->
<!-- attr: { id:'localstorage', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# localStorage
## Access a local Storage object

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:"font-size:0.9em" } -->		
<!-- # localStorage -->					
- 	`localStorage` is per document storage
	- 	Accessible through `window.localStorage`
	- 	Similar to cookies
		- 	But can store much larger amounts of data
- 	Supported down to IE8
	- 	Needs a shim for IE7
- 	Saves data as **string**
- 	`localStorage` properties:
	- 	`setItem(key, value)`
	- 	`getItem(key)`
	- 	`removeItem(key)`
	- 	`length`

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->		
<!-- # localStorage -->
- 	Local Storage

```javascript
function saveState(text){
  localStorage["text"] = text;
}
function restoreState(){
  return localStorage["text"];
}
```
- 	Same as

```javascript
function saveState(text){
  localStorage.setItem("text", text);
}
function restoreState(){
  return localStorage.getItem("text");
}
```			


<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # localStorage -->
## [Demo](/demos/2.%20local-storage.html)


<!-- section start -->
<!-- attr: { id:'sessionstorage', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# sessionStorage
## Access a session Storage object

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->	
<!-- # sessionStorage -->
- 	Session Storage
	- 	Similar to `localStorage`
	- 	Lasts as long as the browser is open
	- 	Opening page in new window or tab starts new session
	- 	Great for sensitive data (e.g. banking sessions)
- 	Can store only **strings**

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->	
<!-- # sessionStorage -->
- 	Session Storage

```javascript
function incrementLoads() {
  if (!sessionStorage.counter) {
    sessionStorage.setItem("counter", 0);
  }
  var currentCount = sessionStorage.getItem("counter") | 0;
  currentCount++;
  sessionStorage.setItem("counter", currentCount);
  
  document
	.getElementById("countDiv")
	.innerHTML = currentCount;
}
```

<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # sessionStorage -->
## [Demo](/demos/3.%20session-storage.html)


<!-- section start -->
<!-- attr: { id:'saving-objects', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Saving Object in WebStorages


<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:"font-size:0.9em" } -->
<!-- # Saving Object -->
- 	Local and session storage can only contain strings
	- 	If you try to save an object, its `toString()` method will be invoked
	- 	Use `JSON.stringify` and `JSON.parse` instead
- 	To save objects into web storages, need to extend the `Storage` prototype

```javascript
Storage.prototype.setObject = 
  function setObject(key, obj){
    this.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getObject = 
  function getObject(key) {
    return JSON.parse(this.getItem(key));
};

```

<!-- section start -->
<!-- attr: { id:'questions', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Web Storages
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
