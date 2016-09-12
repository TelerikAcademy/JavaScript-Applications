module.exports = function() {
  var diviser = 1000003;
  return (function() {
    return {
      next: function() {
        return (new Date()) % diviser;
      }
    };
  }());
};
