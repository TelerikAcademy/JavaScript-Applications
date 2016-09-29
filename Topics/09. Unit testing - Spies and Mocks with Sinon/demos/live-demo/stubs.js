let sinon = require('sinon');

console.log(Math.round(1.7));
console.log(Math.round(1.7));
console.log(Math.round(1.7));

sinon.stub(Math, "round")
	.returns(3)
	.onCall(835).returns(150);

console.log(Math.round(3.2));
console.log(Math.round(12));
console.log(Math.round(32.12873));
console.log(Math.round(3.2));
console.log(Math.round(3.2));

console.log('Call count ' + Math.round.callCount);

Math.round.restore();
console.log(Math.round(1.7));

let counter = (function() {
	let count = 0;

	return function() {
		return count += 1;
	};
}());

sinon.stub(Math, "random", counter);

console.log("Random values here:");
console.log(Math.random());
console.log(Math.random());
console.log(Math.random());
console.log(Math.random());
console.log(Math.random());

Math.random.restore();
console.log(Math.random());
console.log(Math.random());
console.log(Math.random());
console.log(Math.random());
console.log(Math.random());
