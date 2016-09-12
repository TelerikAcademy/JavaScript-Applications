/*globals describe, it, require, before, global*/

var chai = require('chai'),
	sinon = require('sinon'),
	sinonChai = require('sinon-chai');
chai.use(sinonChai);

var expect = chai.expect;

var _ = require('underscore');
var result = require('../tasks/task-1')();

describe('Task #1 Students Tests', function () {

	before(function () {
		global._ = _;
	});

	it('Expect empty array when an empty array is given', function () {
		var actual = [];
		sinon.stub(console, 'log', function (msg) {
			actual.push('' + msg);
		});
		result([]);
		console.log.restore();

		expect(actual).to.eql([]);
	});
	it('Expect empty array when all names should be filtered', function () {
		var students = [{
			firstName: 'NAME #3',
			lastName: 'NAME #2'
		}, {
			firstName: 'NAME #4',
			lastName: 'NAME #1'
		}, {
			firstName: 'OAME #4',
			lastName: 'NAME #7'
		}];

		var actual = [];
		sinon.stub(console, 'log', function (msg) {
			actual.push('' + msg);
		});
		result(students);
		console.log.restore();

		expect(actual).to.eql([]);
	});
	it('Expect valid names to not be filtered', function () {
		var students = [{
			firstName: 'NAME #3',
			lastName: 'NAME #2'
		}, {
			firstName: 'NAME #4',
			lastName: 'NAME #1'
		}, {
			firstName: 'NAME #4',
			lastName: 'NAME #7'
		}];

		var actual = [];
		sinon.stub(console, 'log', function (msg) {
			actual.push('' + msg);
		});
		result(students);
		console.log.restore();

		expect(actual).to.eql(['NAME #4 NAME #7']);
	});

	it('Expect sorting to work properly', function () {
		var students = [{
			firstName: 'Ester',
			lastName: 'Reba'
		}, {
			firstName: 'Abdullo',
			lastName: 'Vilma'
		}, {
			firstName: 'Germano',
			lastName: 'Sabina'
		}, {
			firstName: 'Naomi',
			lastName: 'Tichaona'
		}];

		var actual = [];
		sinon.stub(console, 'log', function (msg) {
			actual.push('' + msg);
		});
		result(students);
		console.log.restore();

		var expected = [
			'Naomi Tichaona',
			'Germano Sabina',
			'Ester Reba',
			'Abdullo Vilma'
		];
		expect(actual).to.eql(expected);
	});

	it('Expect filtering and sorting to work properly', function () {
		var students = [{
			firstName: 'Ester',
			lastName: 'Reba'
		}, {
			firstName: 'Gurgen',
			lastName: 'Edit'
		}, {
			firstName: 'Karolina',
			lastName: 'Gurutze'
		}, {
			firstName: 'Luke',
			lastName: 'Emilee'
		}, {
			firstName: 'Judita',
			lastName: 'Fergus'
		}, {
			firstName: 'Abdullo',
			lastName: 'Vilma'
		}, {
			firstName: 'Margarita',
			lastName: 'Erkki'
		}, {
			firstName: 'Germano',
			lastName: 'Sabina'
		}, {
			firstName: 'Makena',
			lastName: 'Leeba'
		}, {
			firstName: 'Naomi',
			lastName: 'Tichaona'
		}, {
			firstName: 'Isaac',
			lastName: 'Aliza'
		}, {
			firstName: 'Tovah',
			lastName: 'Yafe'
		}, {
			firstName: 'Hersh',
			lastName: 'Afolabi'
		}, {
			firstName: 'Cynbel',
			lastName: 'Tzivya'
		}, {
			firstName: 'Elah',
			lastName: 'Zuri'
		}];

		var actual = [];
		sinon.stub(console, 'log', function (msg) {
			actual.push('' + msg);
		});
		result(students);
		console.log.restore();

		var expected = [
			'Tovah Yafe',
			'Naomi Tichaona',
			'Germano Sabina',
			'Ester Reba',
			'Elah Zuri',
			'Cynbel Tzivya',
			'Abdullo Vilma'
		];
		expect(actual).to.eql(expected);
	});	
});
