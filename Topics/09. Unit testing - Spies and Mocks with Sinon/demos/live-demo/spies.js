let sinon = require('sinon');


let spyFunction = sinon.spy();

spyFunction();
spyFunction(2, 3, 4);
spyFunction(7, 6, [1, 'asdf', {}]);


function sum(...numbers) {
	if(numbers.length === 0) {
		throw 'No numbers';
	}

	return numbers.reduce((a, b) => a + b);
}

let s = sum(1, 6, 8, 9, 13);
console.log(s);

let sumSpied = sinon.spy(sum);

let obj = {};

sumSpied(4, 3, 2, 1);
try {
	sumSpied();
}
catch(e) {}

sumSpied(1);

console.log(sumSpied.calledWithExactly(4, 3, 2, 1));
