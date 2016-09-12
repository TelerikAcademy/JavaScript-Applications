(function () {

	//check if running on Node.js
	if (typeof require !== 'undefined') {
		//load underscore if on Node.js
		_ = require('../../scripts/underscore.js');
	}

	function dice() {
		return (Math.random() * 6 + 1) | 0;
	}
	var values = _.times(5, dice);
	console.log(values);
}());
