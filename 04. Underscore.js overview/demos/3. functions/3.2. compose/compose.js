(function () {
	//check if running on Node.js
	if (typeof require !== 'undefined') {
		//load underscore if on Node.js
		_ = require('../../scripts/underscore.js');
	}

	function first(p) {
		return p + " first";
	}

	function second(p) {
		return p + " second";
	}

	function third(p) {
		return p + " third";
	}

	var all = _.compose(third, second, first);

	console.log(all("zero"));
}());