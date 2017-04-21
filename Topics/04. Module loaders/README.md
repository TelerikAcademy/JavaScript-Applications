<!-- section start -->
<!-- attr: { id:'', class:'slide-title', showInPresentation:true, hasScriptWrapper:true } -->
# Module loaders
## Modular JavaScript

<article class="signature">
	<p class="signature-course">JavaScript Applications</p>
	<p class="signature-initiative">Telerik Software Academy</p>
	<a href="https://telerikacademy.com" class="signature-link">https://telerikacademy.com</a>
</article>

<!-- section start -->
# Table of Contents
- [Vocabulary](#lecture-vocabulary)
- [AMD](#async-module-definition)
- [SystemJS and ES6 Modules](#system-and-es6-modules)
	- [Setting up SystemJS](#setup)
	- [ES6 Modules syntax](#es6-modules-syntax)
	- Using ES6 Modules with SystemJS
- [Further studying](#further-studying)

<!-- section start -->
<!-- attr: { id:'lecture-vocabulary', class: 'slide-section', hasScriptWrapper: true, showInPresentation: true } -->
# Vocabulary

<!-- attr: { showInPresentation: true, style: 'font-size: 0.9em', showInPresentation: true } -->
<!-- # Modules, dependencies, module loaders -->
- A **module** can be defined as code encapsulated into a unit that the outside world can use and refer.
- A **dependency** of a given module is another module or piece of code that is being reffered by then given module.
- A **module loader** is a piece of software that allows the developers to define modules and load them on demand

<!-- attr: { showInPresentation: true } -->
<!-- # AMD and CommonJS -->
- **AMD** and **CommonJS** are specifications for module definitions and loading
	- Specifications define **what** the module loaders should do and **how they** should be used
- Module loaders offer implementations of those specifications

<!-- attr: { style: 'font-size: 0.8em', hasScriptWrapper: true } -->
# Why module loaders <br />and modules?
- Coupling between well-defined modules is loose
	- **Replacing/mocking modules is much easier**
- Good modules avoid the use global scope
	- **less errors and bugs**
- Well-defined modules can be isolated
	- Allows **easier unit testing**
- Good modules declare their dependencies
	- This makes the codebase **easier to read, understand and unit test**
- All of the above makes the codebase less error-prone and easier to maintain

<!-- section start -->
<!-- attr: { id: 'async-module-definition', class: 'slide-section', showInPresentation: true, hasScriptWrapper: true } -->
<!-- # AMD
## Asynchronous Module Definition -->

<!-- attr: { hasScriptWrapper: true, style: 'font-size: 0.85em' } -->
# AMD
- **AMD** stands for Asynchronous Module Definition
- **AMD** specification states that:
	- Modules should be defined using a <br />`define(id, dependecies, factoryFunction)` function
		- `id` should be the name of the module
		- `dependecies` should be a collection with the names of the dependecies of the module
		- `factoryFunction` is a function that accepts the dependencies and returns the module as a result
	- Dependencies are loaded asynchronously when needed(lazy loading)


<!-- attr: { hasScriptWrapper: true, showInPresentation: true } -->
<!-- # AMD -->
- Let module 3 depend on modules 1 and 2. When the modules are refered as scripts in the HTML files, they will be loaded synchronously.

```html
<sсript src="./module1.js"></sсript>
<sсript src="./module2.js"></sсript>
<sсript src="./module3.js"></sсript>
```

<!-- attr: { hasScriptWrapper: true, style: 'font-size: 0.85em', showInPresentation: true } -->
<!-- # AMD -->
- An **AMD** module loader will require us to refer only module 3, and will load it's dependencies asynchronously.

```html
<sсript src="./module3.js"></sсript>
```

<img class="slide-image" showInPresentation="true" src="imgs/AMD.png" style="top:45%; left:30%; width:40%;" />

<!-- section start -->
<!-- attr: { id: 'system-and-es6-modules', class: 'slide-section', hasScriptWrapper: true, showInPresentation: true } -->
<!-- # SystemJS and ES6 Modules
## Set up ES6 Modules with SystemJS -->

# SystemJS
- Module loader that works with all module formats - AMD, CommonJS, ES6 Modules and so on
- Works in Browsers as well as Node.js
- SystemJS has a Babel plugin that allows using ES6 Modules

<!-- attr: { id: 'setup', hasScriptWrapper: true } -->
# Setting up SystemJS <br />for ES6 Modules
- SystemJS and the Babel plugin need to be installed. Make sure you have a `package.json` file in your directory and run the command:

```bat
npm install systemjs systemjs-plugin-babel --save
```

<!-- attr: { hasScriptWrapper: true, style: 'font-size: 0.8em', showInPresentation: true } -->
<!-- # Setting up SystemJS <br />for ES6 Modules -->
- Next, SystemJS need to be configured to use Babel. Place the following code in a `system-config.js` file:

```js
SystemJS.config({
 // tell SystemJS which transpiler to use
 transpiler: 'plugin-babel',
 // tell SystemJS where to look for the dependencies
 map: {
  'plugin-babel': 
  './node_modules/systemjs-plugin-babel/plugin-babel.js',
  'systemjs-babel-build': 
  './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
  // app start script
  'main': './main.js'
 }
});
```

<!-- attr: { hasScriptWrapper: true, style: 'font-size: 0.8em', showInPresentation: true } -->
<!-- # Setting up SystemJS <br />for ES6 Modules -->
- In `index.html`, refer SystemJS and it's configuration file:
- Then, you can run your main module.

```html
<sсript src="./node_modules/systemjs/dist/system.js"></sсript>
<sсript src="./system-config.js"></sсript>
<sсript>
	System.import('main');
</sсript>
```

- Now ES6 Modules are usable and will be transpiled to SystemJS by Babel.

<!-- section start -->
<!-- attr: { id: 'es6-modules-syntax', class: 'slide-section', showInPresentation: true } -->
<!-- # ES6 Modules
## Use and syntax -->

# ES6 Modules
- ES6 Modules define a way to load and define modules with the keyword `import` and `export`.

```js
// ./calculator.js
const calculator = { add: (a, b) => a + b };
export { calculator }; // defines a module
```

```js
// ./app.js
// loads calculator
import { calculator } from './calculator.js';
console.log(calculator.add(3, 4));
```

# Import and Export
- `export` syntax:

```js
// ./utils.js
// together
const jsTrainers = ['Cuki', 'Doncho', 'Ogi', 'Koce'];
function helloPopup() { alert('hello'); }
export { jsTrainers, helloPopup };
```

```js
// ./utils.js
// separately
export const jsTrainers = ['Cuki', 'Doncho', 'Ogi', 'Koce'];
export helloPopup() { alert('Hello'); }
```

<!-- attr: { hasScriptWrapper: true, style: 'font-size: 0.8em', showInPresentation: true } -->
<!-- # Import and Export -->
- `import` syntax:

```js
// load everything from utils.js and make it accessible from mod
import * as mod from './utils.js'; 
console.log(mod.helloPopup, mod.jsTrainers);


// partial import - load only jsTrainers
import { jsTrainers } from './utils.js'; 
console.log(jsTrainers);


// load jsTrainers under the name trainers and helloPopup
import { jsTrainers as trainers, helloPopup } from './utils.js';
console.log(trainers);


// execute the whole module just for side effects
import './utils.js';
// jsTrainers and helloPopup are both undefined
```

<!-- attr: { hasScriptWrapper: true, style: 'font-size: 0.9em' } -->
# Naming modules
- SystemJS gives us a way to name modules:

```js
SystemJS.config({
	// ... ,
	map: {
		// ... ,
		'utils': './my-modules/utils.js'
	}
});
```

- Now we can write the following:

```js
import { helloPopup as popup } from 'utils';
popup();
```

<!-- attr: { hasScriptWrapper: true, style: 'font-size: 0.8em' } -->
# Using SystemJS paths
- SystemJS provides a way to use path aliases:
	- Useful when a lot of the modules share the same location

```js
SystemJS.config({
	// ... ,
	paths: {
		'npm:*': './node_modules/*'
	},
	map: {
		// ... ,
		'jquery': 'npm:jquery/dist/jquery.js',
	}
});
```

- Now we can write the following:

```js
import 'jquery';
$('body').html('Cool!');
```

<!-- attr: { hasScriptWrapper: true, class: 'slide-section', showInPresentation: true } -->
<!-- # ES6 Modules with SystemJS
## [Live Demo]() -->

<!-- section start -->
<!-- attr: { id: 'further-studying', style: 'font-size: 0.8em' } -->
# Further studying
- [Read more](https://github.com/amdjs/amdjs-api/wiki/AMD) on **AMD** specifications
- MDN articles for **ES6 Modules**
	- [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
	- [export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
- **SystemJS** [Docs](https://github.com/systemjs/systemjs/tree/master/docs)
- **SystemJS** can be used with **jspm**, which is a more powerful package manager than npm or bower
	- [getting started](https://medium.com/@swirlycheetah/getting-started-with-jspm-systemjs-d6f2560b7eb4#.hovnr6mur) with **jspm** and **SystemJS**
	- [jspm web site](http://jspm.io/)

<!-- attr: { class:'slide-section', showInPresentation:true, id:'questions' } -->
<!-- # Module loaders
## Questions? -->

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
