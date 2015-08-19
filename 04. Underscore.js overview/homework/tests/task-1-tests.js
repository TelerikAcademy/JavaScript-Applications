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

  it('test', function () {
    var students = [{
      firstName: 'NAME #2',
      lastName: 'NAME #3'
    }, {
      firstName: 'NAME #0',
      lastName: 'NAME #5'
    }, {
      firstName: 'NAME #3',
      lastName: 'NAME #2'
    }, {
      firstName: 'NAME #1',
      lastName: 'NAME #4'
    }, {
      firstName: 'NAME #4',
      lastName: 'NAME #1'
    }];

    var actual = [];
    sinon.stub(console, 'log', function (msg) {
      actual.push(msg);
    });
    result(students);
    console.log.restore();

    var expected = [
      'NAME #0 NAME #5',
      'NAME #1 NAME #4',
      'NAME #2 NAME #3'
    ];
    expect(actual).to.eql(expected);
  });
});