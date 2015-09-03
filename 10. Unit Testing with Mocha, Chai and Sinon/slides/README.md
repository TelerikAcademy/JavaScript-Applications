<!-- section start -->

<!-- attr: {id: 'title', class: 'slide-title', hasScriptWrapper: true} -->

# Unit testing with Mocha, Chai and Sinon
##  How to write tests in JavaScript
<div class="signature">
    <p class="signature-course">JavaScript Applications</p>
    <p class="signature-initiative">Telerik Software Academy</p>
    <a href="http://academy.telerik.com" class="signature-link">http://academy.telerik.com</a>
</div>

<!-- section start -->

<!-- attr: {style: 'font-size: 44px', id: 'table-of-contents'} -->
# Table of Contents
* Unit testing Overview
* Mocha Unit Testing Framework
  * Setup of Mocha
  * Adding assertion framework
* Chai assertion framework
  * `expect`, `should` and `assert`
* Unit testing DOM
  * With jsdom
* SinonJS
  * Creating spy objects
  * Stubbing methods
* Code coverage with Istanbul

<!-- section start -->

<!-- attr: {class: 'slide-section', id: 'unit-testing-overview'} -->
# Unit Testing Overview
##  What is Unit Testing

# Unit Testing - Definition
* A unit test is a piece of code written by a developer that exercises a very small, specific area of functionality of the code being tested.

<div>
  > “Program testing can be used to show the presence of bugs, but never to show their absence!”
  --  Edsger Dijkstra, [1972]

</div>

# Manual Testing
* You have already done unit testing
  * Manually, by hand
* **Manual tests** are less effient
  * Not structured
  * Not repeatable
  * Not on all the
  * Not easy to do as it should


# Manual Unit Tests: Example
* Code:
```javascript
function sum (numbers) {
    var sum = 0;
    numbers.forEach((number) => sum += number);
    return num;
}
```

* Tests:
```javascript
void testSum() {
    if(sum([1, 2]) !== 3) throw new Error('1 + 2 !== 3');
    if(sum([-2]) !== -2) throw new Error('-2 !== -2');
    if(sum([]) !== 0) throw new Error('0 !== 0');
}

```

# Unit Testing: Some Facts
* Tests are **specific pieces of code**
* In most cases unit tests are **written by developers**, not by QA engineers
* Unit tests are **released into the code repository** (TFS / SVN / Git) along with the code they test
* Unit testing framework is needed
  * JavaScipt: QUnit, Jasmine, Mocha
  * .NET: VSTT, NUnit, etc...

# Unit Testing: More Facts
* **All objects** should be tested
* **All methods** should be tested
  * Trivial code may be omitted
    * E.g. property getters and setters
    * Private methods can be omitted
      * Some gurus recommend to never test private methods  this can be debatable
* Ideally **all unit tests should pass** before check-in into the source control repository

# Why Unit Tests?
* Unit tests **dramatically decrease** the number of defects in the code
* Unit tests **improve design**
* Unit tests are **good documentation**
* Unit tests **reduce the cost** of change
* Unit tests **allow refactoring**
* Unit tests **decrease the defect-injection rate** due to refactoring / changes

<!-- section start -->

<!-- attr: {class: 'slide-section', id: 'unit-testing-js'} -->
# Unit Testing in JavaScript
##  Mocha, Jasmine, QUnit, etc...


# Unit Testing in JavaScript
* There are too many frameworks for unit testing JavaScipt code
  * Some use TDD
  * Others use BDD
* Some of the frameworks:
  * TDD:
    * QUnit, JsUnit, Mocha
  * BDD
    * Jasmine, Mocha

#   Testing with QUnit
* QUnit was developed to test jQuery
  * Developed by John Resig
* QUnit has the following features:
  * Uses test-driven development (TDD)
  * Has a lot of asserts to match every need
  * Can test async code

# Testing with Jasmine
* Jasmine is an open-source testing framework
  * Can run in both the browser and on Node.js
  * Uses behavior-driven development
  * Widely used
  * Introduces in 2008
* Jasmine has the following features:
  * Easy-to-read (expressional) syntax
  * Testing async code
  * Spies (mocking objects and methods)
  * DOM testing

# Testing with Mocha
* Mocha is the new kid on the block
  * Open source framework, introduces in 2012
  * Can run in both the browser and on Node.js
  * Plugins for test syntax, spies, etc…
* Mocha has the following features:
  * Easy-to-read (expressional) syntax
  * Testing async code
  * Supports both BDD and TDD
  * The most used plugin for syntax is Chai.js
  * The most used plugin for spies is Sinon

<!-- section start -->

<!-- attr: {class: 'slide-section', id: 'unit-testing-mocha'} -->
# Mocha Overview
##  Install, setup, reporters, tests

# Mocha Overview
* Mocha is a feature-rich framework for testing JavaScript
  * Run in both the browser and on Node.js
  * Can test async code
  * Compatible with Karma & other test runners
  * Pluggable
    * Different plugins to add even more features


# Mocha: Install & Setup
* To use Mocha, follow the steps:
  *  Get Mocha:
    * Download from [GitHub](https://github.com/mochajs/mocha)
    * Use bower: `$ bower install mocha`
    * Use npm: `$ npm install mocha`
  *  Setup a reporter:
    * HTML reporter
    * Spec reporter

<!-- attr: {hasScriptWrapper: true} -->
# Mocha: Install & Setup (cont)
* To use Mocha, follow the steps:
  *  Select an assertion syntax (plugin):
    * `$ bower install chai`
    * `$ npm install chai`
  *  Start with the tests
    * On the next slide


# Simple Tests: Examples

```javascript
describe('#sum', function() {
  it('expect to return 0, When the array is empty', function(){
    var actual = sum([]);
    expect(actual).to.equal(0);
  });
  it('expect to return the number, when only an array with single number is passed', function(){
    var number = 1;
    var actual = sum([1]);
    expect(actual).to.equal(number);
  });
}
```

<!-- attr: {class: 'slide-section'} -->
# Simple tests with <br/>Mocha and Chai
## Live Demo


<!-- section start -->

<!-- attr: {class:'slide-section', id:'mocha-reporters'} -->
# Mocha Reporters
##  Where to show the result of the tests?

# Mocha Reporters
* Mocha supports a lot of reporters
  * HTML reporters
  * Console reporters
  * JSON reporters
  * Etc...

<!-- attr: {hasScriptWrapper: true} -->
# Mocha HTML reporter
* Using the HTML Reporter:

```html

<link rel="stylesheet" href="mocha/mocha.css">
<!-- ... -->
<div id="mocha"></div>
<!-- include mocha.js and chai.js -->
<script>
    mocha.setup('bdd');
    expect = chai.expect;
</ script>

<!-- import javascript files and test files -->

<script >
    mocha.run();
</ script>
```

<!-- attr: {class:'slide-section'} -->
# Mocha HTML Reporter
## Live Demo

# Mocha Other Reporters
* Other reporters are Node.js reporters
  * Can be run from the command line:
    * `$ mocha tests/ -R spec`
    * `$ mocha tests/ -R json`
    * `$ mocha tests/ -R doc`
  * When mocha is not installed globaly
	* `$ iojs node_pakages/mocha/bin/mocha tests/`


<!-- section start -->

<!-- attr: {class: 'slide-questions', id: 'questions'} -->
# Unit Testing with Mocha, Chai and Sinon
## Questions
