/*globals describe, it, require, before, global*/

var chai = require('chai'),
	sinon = require('sinon'),
	sinonChai = require('sinon-chai');
chai.use(sinonChai);

var expect = chai.expect;

var _ = require('underscore');
var result = require('../tasks/task-4')();

describe('Task #4 Students Tests', function () {
	before(function () {
		global._ = _;
	});

	it('Empty array', function () {
		var animals = [];
		var expected = [];

		var actual = [];
		sinon.stub(console, 'log', function (msg) {
			actual.push('' + msg);
		});
		result(animals);
		console.log.restore();

		expect(actual).to.eql(expected);
	});
	it('One animal', function () {
		var animals = [{
			name: 'Illtyd',
			species: 'Fly',
			legsCount: 4
		}];
		var expected = [
			'----',
			'Fly:',
			'----',
			'Illtyd has 4 legs',
		];

		var actual = [];
		sinon.stub(console, 'log', function (msg) {
			actual.push('' + msg);
		});
		result(animals);
		console.log.restore();

		expect(actual).to.eql(expected);
	});
	it('Animals are from the same species', function () {
		var animals = [{
			name: 'Minkov',
			species: 'Mosquito',
			legsCount: 2
		}, {
			name: 'Doncho',
			species: 'Mosquito',
			legsCount: 2
		}, {
			name: 'Komara',
			species: 'Mosquito',
			legsCount: 4
		}];
		var expected = [
			'---------',
			'Mosquito:',
			'---------',
			'Doncho has 2 legs',
			'Minkov has 2 legs',
			'Komara has 4 legs',
		];

		var actual = [];
		sinon.stub(console, 'log', function (msg) {
			actual.push('' + msg);
		});
		result(animals);
		console.log.restore();

		expect(actual).to.eql(expected);
	});
	it('Animals are from different species', function () {
		var animals = [{
			name: 'Minkov',
			species: 'Bogomolka',
			legsCount: 4
		}, {
			name: 'Doncho',
			species: 'Centipede',
			legsCount: 201
		}, {
			name: 'Komara',
			species: 'Mosquito',
			legsCount: 8
		}];
		var expected = [
			'---------',
			'Mosquito:',
			'---------',
			'Komara has 8 legs',
			'----------',
			'Centipede:',
			'----------',
			'Doncho has 201 legs',
			'----------',
			'Bogomolka:',
			'----------',
			'Minkov has 4 legs',
		];

		var actual = [];
		sinon.stub(console, 'log', function (msg) {
			actual.push('' + msg);
		});
		result(animals);
		console.log.restore();

		expect(actual).to.eql(expected);
	});
	it('Animals are from different species', function () {
		var animals = [
		];
		var expected = [
		];

		var actual = [];
		sinon.stub(console, 'log', function (msg) {
			actual.push('' + msg);
		});
		result(animals);
		console.log.restore();

		expect(actual).to.eql(expected);
	});
});
