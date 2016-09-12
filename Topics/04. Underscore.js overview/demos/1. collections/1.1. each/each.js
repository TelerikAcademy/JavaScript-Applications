(function () {

	//check if running on Node.js
	if (typeof require !== 'undefined') {
		//load underscore if on Node.js
		_ = require('../../scripts/underscore.js');
	}

	var text,
		counts,
		person;
	text = "I am studing currently in Telerik Software Academy";

	counts = {};
	_.each(text, function (char) {
		var c = char.toLowerCase();
		if (!counts[c]) {
			counts[c] = 0;
		}
		counts[c]++;
	});

	_.each(counts, function (char, value) {
		console.log(char + " -> " + value);
	});

	person = {
		fname: "Doncho",
		lname: "Minkov",
		toString: function () {
			return this.fname + ' ' + this.lname;
		}
	};
	_.each(_.map(person, function (value, key) {
		return {
			key: key,
			value: value.toString()
		};
	}), function (item) {
		console.log(item.key + ' -> ' + item.value);
	});
}());