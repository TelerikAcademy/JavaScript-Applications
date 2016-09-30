mocha.setup('bdd');

const {expect, assert} = chai;

function checkRoute(actual, expected, reject) {
	if(actual !== expected) {
		reject(new Error(`Invalid route ${actual}`));
	}
}

function checkUserData(user, reject) {
	const prop = Object.keys(user).sort();
	if(prop.length !== 2 || prop[0] !== 'passHash' || prop[1] !== 'username') {
		reject(new Error(`Invalid user data`));
	}
}

const AUTH_KEY = "SOME_AUTH_KEY";
const user = {
	username: 'SOME_USERNAME',
	passHash: 'SOME_PASSHASH'
};

describe('Tests', function() {
	describe('Get cookies tests', function() {
		const result = {
			result: []
		};

		beforeEach(function() {
			sinon.stub(requester, 'getJSON', (route) => {
				return new Promise((resolve, reject) => {
					checkRoute(route, '/api/cookies', reject);
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
					checkRoute(route, '/api/users', reject);
					checkUserData(user, reject);
					resolve(user);
				});
			});
		});
		afterEach(function() {
			requester.postJSON.restore();
		});

		it('Expect registering of user to return the user', function(done) {
			dataService.register(user)
				.then(actual => {
					expect(actual).to.eql(user);
				})
				.then(done, done);
		});
		it('Expect registering invalid data to fail', function(done) {
			dataService.register(42)
				.then(actual => {
					done(new Error('User data is valid'));
				},
				(err) => {
					done();
				});
		});
	});

	describe('Login tests', function() {
		beforeEach(function() {
			sinon.stub(requester, 'putJSON', (route, user) => {
				return new Promise((resolve, reject) => {
					checkRoute(route, '/api/auth', reject);
					checkUserData(user, reject);
					
					resolve({
						result: {
							username: user.username,
							authKey: AUTH_KEY
						}
					});
				});
			});
			localStorage.clear();
		});
		afterEach(function() {
			requester.putJSON.restore();
			localStorage.clear();
		});

		it('Expect login to login the right user and set him in localStorage', function(done) {
			dataService.login(user)
				.then(() => {
					expect(localStorage.getItem('username')).to.equal(user.username);
				})
				.then(done, done);
		});
		it('Expect login to set auth key in localStorage', function(done) {
			dataService.login(user)
				.then(() => {
					expect(localStorage.getItem('authKey')).to.equal(AUTH_KEY);
				})
				.then(done, done);
		});
	});

	describe('Is loggedIn tests', function() {
		beforeEach(function() {
			sinon.stub(requester, 'putJSON', (route, user) => {
				return new Promise((resolve, reject) => {
					checkRoute(route, '/api/auth', reject);
					checkUserData(user, reject);
					
					resolve({
						result: {
							username: user.username,
							authKey: AUTH_KEY
						}
					});
				});
			});
			localStorage.clear();
		});
		afterEach(function() {
			requester.putJSON.restore();
			localStorage.clear();
		});

		it('expect not to be logged in when have not logged in', function(done) {
			dataService.isLoggedIn()
				.then(f => {
					expect(f).to.be.false;
				})
				.then(done, done);
		});
		it('expect to be logged in when we have logged in', function(done) {
			dataService.login(user)
				.then(() => dataService.isLoggedIn())
				.then(f => {
					expect(f).to.be.true;
				})
				.then(done, done);
		});
	});
});

mocha.run();
