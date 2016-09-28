<!-- section start -->
<!-- attr: {id: 'title', class: 'slide-title', hasScriptWrapper: true} -->
# Unit testing - Spies and Mocks with Sinon
## How to write tests in JavaScript

<div class="signature">
    <p class="signature-course">JavaScript Applications</p>
    <p class="signature-initiative">Telerik Software Academy</p>
    <a href="http://academy.telerik.com" class="signature-link">http://academy.telerik.com</a>
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
- To use Sinon, follow the steps:
  - Get Mocha:
    - Download from [GitHub](https://github.com/sinonjs/sinon)
    - Use bower: `$ bower install sinon`
    - Use npm: `$ npm install sinon`

<!-- section start -->
<!-- attr: {class:'slide-section'} -->
# Using SinonJS
## Spies, stubs, mocks

<!-- attr: {showInPresentation:true} -->
# Test spies
- Spy functions record information for their calls
  - Arguments
  - Return value
  - Value of `this`
  - Thrown exceptions (if any)

<!-- attr: {showInPresentation:true} -->
<!-- # Test spies -->
- Spies are created with `sinon.spy()`
  - `sinon.spy()` - makes anonymous function spy
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

<!-- attr: {showInPresentation:true} -->
<!-- # Using SinonJS -->

<!-- section start -->
<!-- attr: {class: 'slide-questions', id: 'questions'} -->
# Unit Testing with Mocha, Chai and Sinon
## Questions
