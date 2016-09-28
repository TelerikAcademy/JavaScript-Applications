let sinon = require('sinon');

let spyFunction = sinon.spy();

console.log(spyFunction.called); // should be false
spyFunction();
console.log(spyFunction.called); // should be true





function sum(...numbers) {
	return numbers.reduce((a, b) => a + b);
}

let sumSpied = sinon.spy(sum);

let s = sumSpied(1, 6, 3, 7);
console.log(s); // 1 + 6 + 3 + 7 = 17

console.log(sumSpied.getCall(0).args[0],
			sumSpied.getCall(0).args[1],
			sumSpied.getCall(0).args[2],
			sumSpied.getCall(0).args[3]);





sinon.spy(console, "log");

const before = console.log.called;
console.log('Calling console.log()');
const after= console.log.called;
console.log(before);
console.log(after);

console.log.restore();
