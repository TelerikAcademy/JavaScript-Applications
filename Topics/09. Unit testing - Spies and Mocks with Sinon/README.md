<!-- section start -->
<!-- attr: {id: 'title', class: 'slide-title', hasScriptWrapper: true} -->
# Unit testing - Spies and Mocks with Sinon
## How to write tests in JavaScript

<div class="signature">
    <p class="signature-course">JavaScript Applications</p>
    <p class="signature-initiative">Telerik Software Academy</p>
	<a href="https://telerikacademy.com" class="signature-link">https://telerikacademy.com</a>
</div>

<!-- section start -->
<!-- attr: {style: 'font-size: 44px', id: 'table-of-contents'} -->
# Table of Contents
- SinonJS overview
  - Setup
- Using SinonJS
  - Creating spy objects
  - Stubbing methods
  - Mocking

<!-- section start -->
<!-- attr: {class:'slide-section'} -->
# SinonJS overview
## Setup

<!-- attr: {showInPresentation:true} -->
<!-- # SinonJS setup -->
- To get **Sinon**:
  - Download from [GitHub](https://github.com/sinonjs/sinon)
  - Use bower: `$ bower install sinon`
  - Use npm: `$ npm install sinon`

<!-- attr: {showInPresentation:true} -->
<!-- # SinonJS setup -->
- With node.js use

```javascript
let sinon = require('sinon');
```

- In browser use

```javascript
< script src="..."></ script>
```

- You can also use a module loader

<!-- section start -->
<!-- attr: {class:'slide-section'} -->
# Using SinonJS
## Test spies

<!-- attr: {showInPresentation:true} -->
<!-- # Test spies -->
- **Spy functions** record information for their calls
  - Arguments
  - Return value
  - Value of `this`
  - Thrown exceptions (if any)

<!-- attr: {showInPresentation:true} -->
<!-- # Test spies -->
- **Spies** are created with `sinon.spy()`
  - `sinon.spy()` - makes anonymous spy function
  - `sinon.spy(function)` - spies on the function
  - `sinon.spy(object, "method")` - replaces `object.method` with a spied version of it
    - restore with `object.method.restore()`

<!-- attr: {showInPresentation:true} -->
<!-- # Test spies -->
- _Example_:

```javascript
sinon.spy($, "ajax");

$.ajax(/* parameters */);

$.ajax.restore();
```

<!-- attr: {showInPresentation:true} -->
# Spy API
- `.callCount`
- `.called`
- `.calledOnce`
- `.calledTwice`
- `.calledThrice`
- `.threw`
- `.alwaysThrew`

<!-- attr: {showInPresentation:true} -->
<!-- # Spy API -->
- `.thisValues` - array of `this` objects
- `.exceptions` - array of exceptions
  - calls without exceptions store `undefined`
- `.returnValues` - array of return values
- `.getCall(n)` - returns the `n`-th call

<!-- attr: {showInPresentation:true} -->
<!-- # Spy API -->
```javascript
let spyCall = spy.getCall(0); // first call
```

- `spyCall.exception` - thrown exception (if any)
- `spyCall.returnValue`
- `spyCall.args` - array-like object
  - has `.length`
  - can be indexed

<!-- section start -->
<!-- attr: {class:'slide-section'} -->
# Using SinonJS
## Test stubs

<!-- attr: {showInPresentation:true} -->
<!-- # Test stubs -->
- **Stubs** are spies with predefined behavior
  - They support the spy API
- They do not call the stubbed method
  - Useful to force execution of code you want to test
  - Useful when you want to prevent some behavior
    - like ajax requests

<!-- attr: {showInPresentation:true} -->
<!-- # Test stubs -->
- **Stubs** are created with `sinon.stub()`
  - `sinon.stub()` - makes anonymous stub
  - `sinon.stub(object, "method")` - replaces `object.method` with a stubbed version of it
    - restore with `object.method.restore()`
  - `sinon.stub(object, "method", func)` - replaces `object.method` with stubbed version of `func`
    - restore with `object.method.restore()`
  - `sinon.stub(object)` - stub all methods in `object`

<!-- attr: {showInPresentation:true} -->
# Stub API
- `.onCall(n)` - define stub behavior on `n`-th call
- `.returns(value)` - make the stub return `value`
- `.returnsThis()` - make the stub return its `this` value
- `.throws()` - make the stub throw exception

<!-- attr: {showInPresentation:true} -->
<!-- # Stub API -->
- `.callsArg(index)` - make the stub call one if its arguments
- `.callsArgOn(index, context)` - use `context` as `this` for the callback
- `.callsArgWith(index, arg1, arg2, ...)` - call with arguments
- `.callsArgOnWith(index, context, arg1, arg2, ...)`

<!-- section start -->
<!-- attr: {class:'slide-section'} -->
# Using SinonJS
## Mocks

<!-- attr: {showInPresentation:true} -->
<!-- # Mocks -->
- **Mocks** are fake methods with predefined behavior and expectations
- Mock only the method under test

<!-- attr: {showInPresentation:true} -->
# Mocks API
- `let mock = sinon.mock(object)` - returns mock for `object`
- `mock.expects("method")` - mock `object.method`, returns expectation
- `mock.restore()` - restores mocked methods
- `mock.verify()` - verifies all expectations

<!-- attr: {showInPresentation:true} -->
# Expectations
- `.atLeast(number)`, `.atMost(number)` - specify expected number of calls
- `.never()` - expect not to be called
- `.once()`, `.twice()`, `.thrice()`, `.exactly(number)`
- `.verify()` - verify expectation

<!-- section start -->
<!-- attr: {showInPresentation:true, class: 'slide-questions', id: 'questions'} -->
<!-- # Unit testing - Spies and Mocks with Sinon
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
