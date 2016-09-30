mocha.setup('bdd');

const {expect, assert} = chai;

describe('Tests', function() {
	describe('Get cookies tests', function() {
		const result = {
			result: []
		};

		beforeEach(function() {
			sinon.stub(requester, 'getJSON', (route) => {
				return new Promise((resolve, reject) => {
					if(route !== '/api/cookies') {
						reject(new Error(`Invalid route ${route}`));
						return;
					}
					resolve(result);
				});
			});
		});
		afterEach(function() {
			requester.getJSON.restore();
		});

		it('expect dataService.cookies() to return correct result', function(done) {
			dataService.cookies()
				.then(obj => {
					expect(obj).to.eql(result)
				})
				.then(done, done);
		});
	});

	describe('Register tests', function() {

		beforeEach(function() {
			sinon.stub(requester, 'postJSON', (route, user) => {
				return new Promise((resolve, reject) => {
					if(route !== '/api/users') {
						reject(new Error(`Invalid route ${route}`));
						return;
					}
					resolve(user);
				});
			});
		});
		afterEach(function() {
			requester.postJSON.restore();
		});

		const user = {
			username: 'Cuki',
			passHash: 'pesho42'
		};

		it('Register user test', function(done) {
			dataService.register(user)
				.then(actual => {
					expect(actual).to.eql(user);
				})
				.then(done, done);
		});
	});
});

mocha.run();
