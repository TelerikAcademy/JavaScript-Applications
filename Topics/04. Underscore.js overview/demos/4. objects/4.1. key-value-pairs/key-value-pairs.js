(function () {
	//check if running on Node.js
	if (typeof require !== 'undefined') {
		//load underscore if on Node.js
		_ = require('../../scripts/underscore.js');
	}
	var person = {
		firstname: "Doncho",
		lastname: "Minkov",
		age: 18,
		introduce: function () {
			return 'Hi! My name is ' + this.firstname + ' ' + this.lastname +
				' and I am ' + this.age + '-years-old.';
		}
	};

	console.log('---Keys: ');
	console.log(_.keys(person));

	console.log('---Values: ');
	console.log(_.values(person));

	console.log('---Pairs: ');
	console.log(_.pairs(person));

	console.log('---Inverted: ');
	console.log(_.invert(person));

}());