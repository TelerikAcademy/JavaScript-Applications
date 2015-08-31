var expect = require('chai').expect,
  sum = require('../app/app');

describe('#sum', function() {
  it('expect sum(1,2,3) to equal 6', function() {
    var actual = sum(1, 2, 3),
      expected = 6;
    expect(actual).to.equal(expected);
  })
  it('expect sum([1,2,3]) to equal 6', function() {
    var actual = sum([1, 2, 3]),
      expected = 6;
    expect(actual).to.equal(expected);
  })
  it('expect sum() to equal 0', function() {
    var actual = sum(),
      expected = 0;
    expect(actual).to.equal(expected);
  })
  it('expect sum([]) to equal 0', function() {
    var actual = sum([]),
      expected = 0;
    expect(actual).to.equal(expected);
  })
});
