function write(selector, message) {
  var element = document.querySelector(selector);
  element.innerHTML += "<p>Message: <strong>" + message + "</strong></p>";
}

var jsConsole = function() {
  function write(selector, message) {
    var element = document.querySelector(selector);
    element.innerHTML += "<p>Message: <strong>" + message + "</strong></p>";
  }
  return {
    write: write
  };
}();