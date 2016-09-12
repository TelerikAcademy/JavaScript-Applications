(function () {

	//check if running on Node.js
	if (typeof require !== 'undefined') {
		//load underscore if on Node.js
		_ = require('../../scripts/underscore.js');
	}

	var compiled_greeting = _.template("Hello, <%= name %>!");
	console.log(compiled_greeting({name: 'World'}));

	var compiled_tag = _.template("<%- tag %>");
	console.log(compiled_tag({tag: '<script>'}));

	var compiled_code = _.template("<% console.log('My name is ' + name); %>");
	compiled_code({name: 'Underscore'});
}());
