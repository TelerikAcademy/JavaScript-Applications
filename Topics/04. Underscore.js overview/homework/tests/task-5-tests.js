/*globals describe, it, require, before, global*/

var chai = require('chai'),
	sinon = require('sinon'),
	sinonChai = require('sinon-chai');
chai.use(sinonChai);

var expect = chai.expect;

var _ = require('underscore');
var result = require('../tasks/task-5')();

describe('Task #5 Students Tests', function () {
	before(function () {
		global._ = _;
	});

	it('One animal', function() {
		var animals = [{
			name: 'Milivoj',
			species: 'cat',
			legsCount: 4
		}];
		var expected = ['Total number of legs: 4'];

		var actual = [];
		sinon.stub(console, 'log', function (msg) {
			actual.push('' +msg);
		});
		result(animals);
		console.log.restore();

		expect(actual).to.eql(expected);
	});
	it('Two animals', function() {
		var animals = [{
			name: 'Epiphanios',
			species: 'Fly',
			legsCount: 41
		}, {
			name: 'Traktor4o',
			species: 'Cockroach',
			legsCount: 1
		}];
		var expected = ['Total number of legs: 42'];

		var actual = [];
		sinon.stub(console, 'log', function (msg) {
			actual.push('' +msg);
		});
		result(animals);
		console.log.restore();

		expect(actual).to.eql(expected);
	});
	it('Many animals', function() {
		var animals = [{
			name: 'Illtyd',
			species: 'Fly',
			legsCount: 1
		}, {
			name: 'Hodei',
			species: 'Spam',
			legsCount: 2
		}, {
			name: 'Flynn',
			species: 'Centipede',
			legsCount: 100
		}, {
			name: 'Isaac',
			species: 'Dog',
			legsCount: 15
		}, {
			name: 'Anass',
			species: 'Mouse',
			legsCount: 7
		}, {
			name: 'Gionata',
			species: 'Rat',
			legsCount: 4
		}, {
			name: 'Azazyahu',
			species: 'Butterfly',
			legsCount: 2
		}, {
			name: 'Nikanor',
			species: 'Waterfowl',
			legsCount: 4
		}, {
			name: 'Van',
			species: 'Dormouse',
			legsCount: 4
		}, {
			name: 'Lavrentiy',
			species: 'Meerkat',
			legsCount: 11
		}];
		var expected = ['Total number of legs: 150'];

		var actual = [];
		sinon.stub(console, 'log', function (msg) {
			actual.push('' +msg);
		});
		result(animals);
		console.log.restore();

		expect(actual).to.eql(expected);
	});
});
