mocha.setup('bdd');

let expect = chai.expect;
let assert = chai.assert;

describe('Task Gosho', function() {
	it('Test 1', function() {
		expect(2).to.equal(2);
	});

	it('Test 2', function() {
		expect(3).to.equal(3);
	});

	it('Equal test', function() {
		const array = [1, 2, 3];
		expect(array).to.equal(array);
	});
	it('Eql test', function() {
		const array1 = [1, 2, 3];
		const array2 = [1, 2, 3];
		expect(array1).to.eql(array2);
	});

	describe('Zero tests', function() {
		it('Expect ShoppingCart to exist', function() {
			expect(ShoppingCart).to.exist;
		});
		it('Expect ShoppingCart to be a function', function() {
			expect(ShoppingCart).to.be.a('function');
		});
		it('Expect ShoppingCart constructor to set a name', function() {
			let name = 'Pesho';
			let cart = new ShoppingCart(name);
			expect(cart).to.be.a('object');
		});
		it('Expect ShoppingCart get name to return valid name', function() {
			let name = 'Pesho';
			let cart = new ShoppingCart(name);
			expect(cart.name).to.equal(name);
		});
		it('Expect ShoppingCart construct with string to work', function() {
			let name = 'Pesho';

			function test() {
				new ShoppingCart(name);
			};
			
			expect(test).to.not.throw();
		});
		it('Expect ShoppingCart construct with number to throw', function() {
			let name = 42;

			function test() {
				new ShoppingCart(name);
			};
			
			expect(test).to.throw();
		});
		it('Expect ShoppingCart set name with string to work', function() {
			let name = 'Pesho';
			let cart = new ShoppingCart(name);

			function test() {
				cart.name = 'Gosho';
			};
			
			expect(test).to.not.throw();
		});
		it('Expect ShoppingCart construct with number to throw', function() {
			let name = 'Pesho';
			let cart = new ShoppingCart(name);

			function test() {
				cart.name = 42;
			};
			
			expect(test).to.throw();
		});
		it('Expect name to be changed', function() {
			let name = 'Pesho';
			let newName = 'Gosho';
			let cart = new ShoppingCart(name);

			cart.name = newName;
			expect(cart.name).to.equal(newName);
		});
	});

	describe('Assertions', function() {
		it('Assert test', function() {
			assert(2 === 2, '2 is not 3');
		});
	});
});

mocha.run();
