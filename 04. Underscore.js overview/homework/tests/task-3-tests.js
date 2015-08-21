/*globals describe, it, require, before, global*/

var chai = require('chai'),
	sinon = require('sinon'),
	sinonChai = require('sinon-chai');
chai.use(sinonChai);

var expect = chai.expect;

var _ = require('underscore');
var result = require('../tasks/task-3')();

describe('Task #3 Students Tests', function () {
	before(function () {
		global._ = _;
	});

	it('There is only one student with one mark', function() {
		var students = [{
			firstName: 'Nikita',
			lastName: 'Anath',
			age: 14,
			marks: [6]
		}];
		var expected = ['Nikita Anath has an average score of 6'];

		var actual = [];
		sinon.stub(console, 'log', function (msg) {
			actual.push('' + msg);
		});
		result(students);
		console.log.restore();

		expect(actual).to.eql(expected);
	});
	it('There is only one student', function() {
		var students = [{
			firstName: 'Valter',
			lastName: 'Nicphore',
			age: 65,
			marks: [6, 6, 5, 4, 3, 6]
		}];
		var expected = ['Valter Nicphore has an average score of 5'];

		var actual = [];
		sinon.stub(console, 'log', function (msg) {
			actual.push('' + msg);
		});
		result(students);
		console.log.restore();

		expect(actual).to.eql(expected);
	});
	it('All students have one mark', function() {
		var students = [{
			firstName: 'Stanimir',
			lastName: 'Jakov',
			age: 24,
			marks: [6]
		}, {
			firstName: 'Stanimir',
			lastName: 'Jakov',
			age: 17,
			marks: [5]
		}, {
			firstName: 'Frederick',
			lastName: 'Jacob',
			age: 1,
			marks: [4.2]
		}, {
			firstName: 'Joukahainen',
			lastName: 'Valerian',
			age: 1,
			marks: [4]
		}, {
			firstName: 'Teodor',
			lastName: 'Mervyn',
			age: 8,
			marks: [6]
		}, {
			firstName: 'Kristaps',
			lastName: 'lfsige',
			age: 30,
			marks: [7.3]
		}, {
			firstName: 'Varnava',
			lastName: 'Peter',
			age: 42,
			marks: [3]
		}, {
			firstName: 'Aibek',
			lastName: 'Patricio',
			age: 9,
			marks: [7]
		}, {
			firstName: 'Lovre',
			lastName: 'Thoko',
			age: 11,
			marks: [2]
		}, {
			firstName: 'Ambrosius',
			lastName: 'Volos',
			age: 26,
			marks: [4]
		}];
		var expected = ['Kristaps lfsige has an average score of 7.3'];

		var actual = [];
		sinon.stub(console, 'log', function (msg) {
			actual.push('' + msg);
		});
		result(students);
		console.log.restore();

		expect(actual).to.eql(expected);
	});
	it('All students have two marks', function() {
		var students = [{
			firstName: 'Stanimir',
			lastName: 'Jakov',
			age: 24,
			marks: [6, 4]
		}, {
			firstName: 'Stanimir',
			lastName: 'Jakov',
			age: 17,
			marks: [5, 5]
		}, {
			firstName: 'Frederick',
			lastName: 'Jacob',
			age: 1,
			marks: [4.2, 3.7]
		}, {
			firstName: 'Joukahainen',
			lastName: 'Valerian',
			age: 1,
			marks: [4, 3.7]
		}, {
			firstName: 'Teodor',
			lastName: 'Mervyn',
			age: 8,
			marks: [6, 1.2]
		}, {
			firstName: 'Kristaps',
			lastName: 'lfsige',
			age: 30,
			marks: [7.3, 6.9]
		}, {
			firstName: 'Varnava',
			lastName: 'Peter',
			age: 42,
			marks: [3, 4]
		}, {
			firstName: 'Aibek',
			lastName: 'Patricio',
			age: 9,
			marks: [7, 8]
		}, {
			firstName: 'Lovre',
			lastName: 'Thoko',
			age: 11,
			marks: [2, 10]
		}, {
			firstName: 'Ambrosius',
			lastName: 'Volos',
			age: 26,
			marks: [4, 4.2]
		}];
		var expected = ['Aibek Patricio has an average score of 7.5'];

		var actual = [];
		sinon.stub(console, 'log', function (msg) {
			actual.push('' + msg);
		});
		result(students);
		console.log.restore();

		expect(actual).to.eql(expected);
	});
	it('All students have various number marks', function() {
		var students = [{
			firstName: 'Stanimir',
			lastName: 'Jakov',
			age: 24,
			marks: [6]
		}, {
			firstName: 'Stanimir',
			lastName: 'Jakov',
			age: 17,
			marks: [5, 5, 3]
		}, {
			firstName: 'Frederick',
			lastName: 'Jacob',
			age: 1,
			marks: [4.2, 3.7, 1, 1, 1, 1]
		}, {
			firstName: 'Joukahainen',
			lastName: 'Valerian',
			age: 1,
			marks: [4, 3.7, 0, 10, 4]
		}, {
			firstName: 'Teodor',
			lastName: 'Mervyn',
			age: 8,
			marks: [6, 1.2, 2.1]
		}, {
			firstName: 'Kristaps',
			lastName: 'lfsige',
			age: 30,
			marks: [7.3, 6.9, 1, 4, 1, 5, 9, 1, 3, 1, 7, 1]
		}, {
			firstName: 'Varnava',
			lastName: 'Peter',
			age: 42,
			marks: [3, 4, 8, 8]
		}, {
			firstName: 'Aibek',
			lastName: 'Patricio',
			age: 9,
			marks: [7, 8, 2]
		}, {
			firstName: 'Lovre',
			lastName: 'Thoko',
			age: 11,
			marks: [2, 10, 10, 7.7, 5.4, 7.1, 7.9, 6.66, 5.7, 7.6]
		}, {
			firstName: 'Ambrosius',
			lastName: 'Volos',
			age: 26,
			marks: [4, 4.2]
		}];
		var expected = ['Lovre Thoko has an average score of 7.006'];

		var actual = [];
		sinon.stub(console, 'log', function (msg) {
			actual.push('' + msg);
		});
		result(students);
		console.log.restore();

		expect(actual).to.eql(expected);
	});
});
