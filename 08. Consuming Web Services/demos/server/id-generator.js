'use strict';

function* idGenerator() {
  var lastId = 0;

  while (true) {
    yield lastId += 1;
  }
}
module.exports = idGenerator();
// module.exports = idGenerator();
