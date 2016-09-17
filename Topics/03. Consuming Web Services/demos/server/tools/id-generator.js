/* globals module*/
"use strict";

function* idGenerator() {
    var lastId = 0;

    while (true) {
        yield lastId += 1;
    }
}


let m = {
    get: function() {
        let idGenInstance = idGenerator();
        return {
            next: function() {
                return idGenInstance.next().value;
            }
        };
    }
};

module.exports = m;