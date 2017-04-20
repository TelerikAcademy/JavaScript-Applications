<!-- section start -->

<!-- attr: {id: 'title', class: 'slide-title', hasScriptWrapper: true} -->
# Consuming Remote Data
##  HTTP, AJAX and jQuery
<div class="signature">
    <p class="signature-course">JavaScript Applications</p>
    <p class="signature-initiative">Telerik Software Academy</p>
    <a href="https://telerikacademy.com" class="signature-link">https://telerikacademy.com</a>
</div>


<!-- section start -->

<!-- attr: {id: 'table-of-contents'} -->
# Table of Contents
-	Web Services Overview
-	RESTful Services Overview
-	`XMLHttpRequest` object
  -	Creating request
  -	Using the data
-	`jQuery.ajax()`
-	Creating HTTP requests with jQuery

<!-- section start -->

<!-- attr: {class: 'slide-section', id: 'web-services'} -->
# Web Services Overview
##  Web services and SOA Architecture

<!-- attr: {style: 'font-size: 45px'} -->
# Web Services Overview
- A web service is a method of communication between two devices in WWW
  - **The server** device **exposes** service endpoints
  - **The client** device **sends** requests to these endpoints
- Web services are the main part of the SOA architecture
  - **Database** and **Business** logic on the **server**
    - The server exposes public service endpoints
  - **UI logic** on a **client**
    - Sends requests to the server's services endpoints
    - Can be a **web** client (HTML&JS), **mobile** client (iOS, Android, WindowsPhone), etc..


<!-- section start -->

<!-- attr: {class: "slide-section", id: "restful-web-services", showInPresentation: true} -->
<!-- # RESTful Web Services
##  Lightweight Architecture for Web Services -->

<!-- attr: {style: 'font-size: 45px'} -->
# What is REST?

<div>
> "Representational state transfer (REST) is a style of software architecture for distributed hypermedia systems such as the World Wide Web."</cite>
> -- [Wikipedia](http://en.wikipedia.org/wiki/Representational_State_Transfer)

</div>

- **Application state** and **functionality** are resources
- Resources are used as **common data files**
  - Every resource has an URI
  - All resources share a uniform interface
  - This natively maps to the HTTP protocol

<!-- section start -->

<!-- attr: {class: 'slide-section', id: 'xhr-object', showInPresentation: true} -->
<!-- # XMLHttpRequest Object
##  The way to work with web services -->

# XMLHttpRequest Object
-  `XMLHttpRequest` is a JavaScript Object, that provides a way to retrieve a resource by an URL
  -  Designed by Microsoft
    -  Adopted by Mozilla, Apple and Google
  -  Nowadays standardized by the W3C
  -  The `XHR` can retrieve resources both **synchronously** and **asynchronously**
  -  Тhe data can be of any format, not strictly XML
    -  JSON, HTML or just plain tex

#   Using the `xhr` Object
-  To create an HTTP request:
  1.   Create an instance of `xhr`:

      ```javascript
        var httpRequest = new XMLHttpRequest();
      ```

  2.   Open the request, passing HTTP Verb and endpoint:
      ```javascript
        httpRequest.open('GET', url, true );
      ```

  3.   Send it to the server:
      ```javascript
        httpRequest.send(null);
      ```

<!-- attr: {class: 'slide-section', showInPresentation: true} -->
<!-- # Using `xhr` object -->
##  Live Demo


<!-- section start -->

<!-- attr: {class: 'slide-section', id: 'http-client-server', showInPresentation: true} -->
<!-- # HTTP Client-Server Communication
##  Client requests, Server responds -->

<!-- attr: {style: 'font-size: 42px'} -->
# HTTP Client-Server Communication
-  The communication between client and server in HTTP is as follows:
  1.  The client requests a resource
  2.  The server receives the request
    -  If the **resource is available**, the server responds with **success**
    -  If the **resource is not available**, the server response with **error**
-  The server and the client can exchange data in their communication
  -  The client can send the data using either **query parameters** or **request body**
  -  The server can send data using the **response body**

# `xhr` Ready States
  -  `XHR` instances have an event that fires when the server sends a response
    -  The `onreadystatechange` event
  -  Handlers are executed for each the states of this request
    -  **Unitialized** – `readyState is 0`
    -  **Loading** – `readyState is   1`
    -  **Loaded** – `readyState is 2`
    -  **Interactive** – `readyState is 3`
    -  **Complete** – `readyState is 4`

# `xhr` Ready States
  -  `readyState 4` (complete) is the most important
    -  It means our client has received a response from the server
      -  Yet, the response is either **success** or **error**
    - Check the `statusCode` property to see the type of the response

    ```javascript
      httpRequest.onreadystatechange = function(){
        if (httpRequest.readyState === 4) {
          console.log('Response received');
        }
      };
    ```

<!-- attr: {class: 'slide-section'} -->
# `xhr` ReadyStates
##  Live Demo

<!-- attr: {style: 'font-size: 41px', hasScriptWrapper: true} -->
# HTTP Status Code
-  Ready state tell us that the response has arrived
  -  But what is the actual response type?
  -  Remember HTTP status codes?
    -  `2XX` means the request is **successful**
        -  The request done its job and we have the requested data in the response
    -  `4XX` and `5XX` mean something is **wrong**

    ```javascript
      if (httpRequest.readyState === 4) {
        statusType = (httpRequest.status/ 200) | 0;
        if(statusType === 2){ /* success */ }
        else { /* error */ }
      }
    ```

    <div class="balloon fragment" style="bottom: 13%; right: 5%; font-size: 1.4rem">
      Handles status codes `200`, `201`, `400`, `404`, etc
    </div>

<!-- attr: {class: 'slide-section'} -->
# HTTP Status Codes
##  Live Demo

<!-- section start -->

<!-- attr: {class: 'slide-section', id: 'using-the-response' } -->
# Using the Response from HTTP
##  Parsing the Data

# Using the Response from HTTP
-  The body of the response can be accessed vie the `responseText` property
  -  When the `readyState` is `4`
-  `responseText` contains a string with the data
  -  Based on the value of the `Accept` HTTP header it can be in format **HTML**, **XML**, **JSON** or **plain text**
  -  Must be parsed to the correct data format

<!-- attr: {class: 'slide-section'} -->
# Using the Response from HTTP
##  Live Demo

<!-- section start -->

<!-- attr: {class: 'slide-section', id: 'building-http-request'} -->
# Building an HTTP Request
##  All above in one method

# Building an HTTP Request
-  `XMLHttpRequest` creates a **HTTP** request with default characteristics
  -  The **HTTP** method is "`GET`"
  -  `Content-Type` and `Accept` have different values based on the client
  -  **HTTP** body is empty (NULL)
  -  etc…
-  All of these can be customized

<!-- attr: {hasScriptWrapper: true} -->
# Building an HTTP Request
-  To set an **HTTP** header on the request use `httpRequest.setRequestHeader(header, value)`
  -  After the request is open
  -  And before the request is sent
```javascript
    httpRequest.open('GET', endpointUrl, true);
    httpRequest.setRequestHeader('Content-type', 'application/json');
    httpRequest.setRequestHeader('Accept', 'application/json');
    httpRequest.send(null);
```
<!-- .element: style="font-size:1.4rem" class="lang-js" -->


<!-- attr: {style: 'font-size: 43px', hasScriptWrapper: true} -->
# Creating a Method for HTTP Requests
-  Isn't a method like the following better?

```javascript
httpRequest.post({
  url: '/data.json', method: 'POST', data: data,
  headers: { 'content-type': 'appllication/json' },
  success: successCb, error: errorCb
});
```

or even with promises:

```javascript
httpRequest.send({
  url: '/data.json',
  headers: { 'content-type': 'appllication/json' }
}).then(successCb, errorCb);
```

<!-- attr: {class: 'slide-section'}-->
# Building an HTTP Requests
##  Live Demo

<!-- section start -->

<!-- attr: {class: 'slide-section', id: 'jquery-ajax'} -->
# jQuery AJAX
##  The easy way of AJAX

<!-- attr: {hasScriptWrapper: true} -->
# jQuery AJAX
-  [jQuery](https://jquery.com) <!-- .element: target="_blank" -->
has a functionality for creating HTTP requests
-  jQuery AJAX methods:
  -  `$.ajax(options)`
  -  `$.getJSON(url, success).error()`
  -  `$.post(url, data, success, 'json').error()`
  -  `$(selector).load(urlToPartialHTML)`
        </script>
      </section>

# The `$.ajax()` Method
-  `$.ajax()` is the primary method for creating HTTP requests
  -  The options parameter contains all the data, needed to build a complete HTTP request
    -  And allows a customized request

```javascript
$.ajax(url, {
  type: 'GET',
  timeout: 5000,
  contentType: 'application/json',
  success: function (response) { /- handle the success */ }
  error: function (err) { /- handle the error */}
});
```

<!-- attr: {class: 'slide-section'} -->
# The `$.ajax()` Method
##  Live Demo

# `$.getJSON()` and `$.post()`
-  `$.getJSON()` and `$.post()` are wrapper methods to make an HTTP requests with **GET** and **POST** HTTP method
  -  Takes as parameters URL of the resource and a success callback
    -  An error handler should be set as a promise

```javascript
$.getJSON(url, successCb)
  .error(errorCb);
$.post(url, data, successCb, 'json')
  .error(errorCb);
```

<!-- attr: {class: 'slide-section'} -->
# `$.getJSON()` and `$.post()`
##  Live Demo

# `$(selector).load()`
-  `$(selector).load()` is the only ajax method that is called on a DOM element
  -  Performs a GET HTTP request
  -  **Sets the innerHTML** of the DOM element to the **value of the response**

```javascript
$('#response').load('/partials/details.html');
```

<!-- attr: {class: 'slide-section'} -->
# `$(selector).load()`
##  Live Demo

<!-- section start -->
<!-- attr: {class: 'slide-questions', id: 'questions'}  -->
# Consuming Remote Data
## Questions

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size: 0.9em' } -->
# Free Trainings<br/>@ Telerik Academy
- "Web Design with HTML 5, CSS 3 and JavaScript" course @ Telerik Academy
    - [javascript course](http://academy.telerik.com/student-courses/web-design-and-ui/javascript-fundamentals/about)
  - Telerik Software Academy
    - [academy.telerik.com](academy.telerik.com)
  - Telerik Academy @ Facebook
    - [facebook.com/TelerikAcademy](facebook.com/TelerikAcademy)
  - Telerik Software Academy Forums
    - [forums.academy.telerik.com](http://telerikacademy.com/Forum/Home
