mocha.setup('bdd');

const {expect, assert} = chai;

describe('Tests', function() {
	it('Example test', function() {
		expect(2).to.equal(2);
	});
});

mocha.run();
