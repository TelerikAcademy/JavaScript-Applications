(function () {

	//check if running on Node.js
	if (typeof require !== 'undefined') {
		//load underscore if on Node.js
		_ = require('../../scripts/underscore.js');
	}

	var Person = Object.create({
		init: function (fname, lname, age) {
			this.fname = fname;
			this.lname = lname;
			this.age = age;
			return this;
		},
		fullname: function () {
			return this.fname + ' ' + this.lname;
		}
	});

	var people = [];
	for (var i = 0; i < 10; i++) {
		var fname = "Person",
			lname = "#" + i,
			age = (i) % 5 + 10;
		people[i] = Object.create(Person)
			.init(fname, lname, age);
	}
	console.log('---All people: ');
	console.dir(_.map(people, function (person) {
		return '(Name: ' + person.fullname() + ', Age: ' + person.age + ')';
	}));

	var elevenYearOlds = _.where(people, {
		age: 11
	});

	console.log('---11-year-olds: ');
	console.dir(_.map(elevenYearOlds, function (person) {
		return '(Name: ' + person.fullname() + ', Age: ' + person.age + ')';
	}));

}());