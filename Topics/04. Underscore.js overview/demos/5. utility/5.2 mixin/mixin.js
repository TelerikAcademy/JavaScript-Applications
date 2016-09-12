(function () {

	//check if running on Node.js
	if (typeof require !== 'undefined') {
		//load underscore if on Node.js
		_ = require('../../scripts/underscore.js');
	}

	_.mixin({
		getNumbers: function(str) {
			return str.match(/[0-9]+/g);
		},
		getWords: function(str) {
			return str.match(/[a-z]+/g);
		}
	});
	console.log(_.getNumbers('spam word 42 is 12'));
}());
