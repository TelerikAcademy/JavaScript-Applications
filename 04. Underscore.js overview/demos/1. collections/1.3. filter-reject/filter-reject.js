(function () {

	//check if running on Node.js
	if (typeof require !== 'undefined') {
		//load underscore if on Node.js
		_ = require('../../scripts/underscore.js');
	}

	var Person = Object.create({
		init: function (fname, lname) {
			this.fname = fname;
			this.lname = lname;
			return this;
		},
		toString: function () {
			return this.fname + ' ' + this.lname;
		}
	});

	var people = [
		Object.create(Person).init('Doncho', 'Minkov'),
		Object.create(Person).init('Nikolay', 'Kostov'),
		Object.create(Person).init('Aneliya', 'Stoyanova'),
		Object.create(Person).init('Ivaylo', 'Kenov'),
		Object.create(Person).init('Todor', 'Stoyanov')
	];

	var withFamilynameWithK = _.filter(people, function (p) {
		return p.lname[0] === 'K';
	});

	console.log('---People whose lastname starts with "K":');
	_.each(withFamilynameWithK, function (p) {
		console.log(p.toString());
	});

	var withoutFamilynameWithK = _.reject(people, function (p) {
		return p.lname[0] === 'K';
	});

	console.log('---People whose lastname does not start with "K":');
	_.each(withoutFamilynameWithK, function (p) {
		console.log(p.toString());
	});

}());