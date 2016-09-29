let sinon = require('sinon');

let mock = sinon.mock(Math);

mock.expects("abs").atLeast(10);

let randomExpectation = mock.expects("random")
randomExpectation.atLeast(2)
	.atMost(4);

Math.random();
Math.random();
Math.random();
Math.random();

randomExpectation.verify();
try {
	mock.verify();
}
catch(e) {
	console.log(e);
}
