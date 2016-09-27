mocha.setup('bdd');
expect = chai.expect;

describe('#sum', function() {
	it('expect sum(1,2,3) to equal 6', function() {
		const actual = sum(1, 2, 3),
			expected = 6;
		expect(actual).to.equal(expected);
	})
	it('expect sum([1,2,3]) to equal 6', function() {
		const actual = sum([1, 2, 3]),
			expected = 6;
		expect(actual).to.equal(expected);
	})
	it('expect sum() to equal 0', function() {
		const actual = sum(),
			expected = 0;
		expect(actual).to.equal(expected);
	})
	it('expect sum([]) to equal 0', function() {
		const actual = sum([]),
			expected = 0;
		expect(actual).to.equal(expected);
	})
});


describe('Sinon', function() {
	let messages;

	beforeEach(function() {
		messages = [];
		sinon.stub(console, 'log', function(msg) {
			messages.push(msg);
		});
	});

	afterEach(function() {
		console.log.restore();
	});

	it('Expect to capture the print to the console', function() {
		console.log('Hello!');

		expect(console.log.called).to.be.true;
		expect(console.log.calledWith('Hello!')).to.be.true;
		expect(messages).to.eql(['Hello!']);
	});
});

mocha.run();
