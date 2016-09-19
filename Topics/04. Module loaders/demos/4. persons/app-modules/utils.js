'use strict';

export function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function* idGenerator() {
    let currentId = 0;

    while(true) {
        yield currentId;
        currentId += 1;
    }
}

export function helloPopup() {
    alert('hello')
}

// export { clone }