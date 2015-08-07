function write(message) {
  console.log("Message: " + message);
}

consoleUtils = function() {
  function write(message) {
    console.log("Message: " + message);
  }

  return {
    write: write
  };
}();