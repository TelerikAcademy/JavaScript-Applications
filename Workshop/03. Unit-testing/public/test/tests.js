mocha.setup('bdd');

const {expect, assert} = chai;

describe('Tests', function() {
	describe('Get cookies tests', function() {
		it('expect cookies() to return a response', function(done) {
			dataService.cookies()
				.then(obj => {
					expect(obj).to.exist;
				})
				.then(done, done);
		});
	});
});

mocha.run();
