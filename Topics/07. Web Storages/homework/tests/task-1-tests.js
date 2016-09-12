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

});
