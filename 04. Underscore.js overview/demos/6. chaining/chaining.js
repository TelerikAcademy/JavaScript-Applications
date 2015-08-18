(function () {

	//check if running on Node.js
	if (typeof require !== 'undefined') {
		//load underscore if on Node.js
		_ = require('../scripts/underscore.js');
	}

	var foods = [{name: 'chocolate', price: 42},
	             {name: 'tomatoes', price: -1000},
	             {name: 'watermelon', price: 17}];
	var sentence = _.chain(foods).sortBy(function(food) {
			return -food.price; // sort in reverse
	}).map(function(food) {
			return 'The price of ' + food.name + ' is ' + food.price + '.';
	}).first().value();
	console.log(sentence);
}());

