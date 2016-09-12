(function () {
	//check if running on Node.js
	if (typeof require !== 'undefined') {
		//load underscore if on Node.js
		_ = require('../../scripts/underscore.js');
	}

	var fib = _.memoize(
		function (n) {
			var fibN = n < 2 ? n : fib(n - 2) + fib(n - 1);
			console.log("fib[" + n + "]= " + fibN);
			return fibN;
		});
	fib(200);
}());