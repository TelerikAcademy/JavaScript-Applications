function sum(numbers) {
  // if (!(Array.isArray(numbers))) {
  //   numbers = [].slice.call(arguments, 0);
  // }
  return numbers.reduce(function(s, n) {
    return s + n;
  }, 0);
}

module.exports = sum;
