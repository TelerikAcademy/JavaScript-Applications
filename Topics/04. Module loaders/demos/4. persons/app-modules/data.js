'use strict';

import { clone, idGenerator as createIdGenerator } from 'utils';

const records = [],
    idGen = createIdGenerator();

function add(person) {
    const clonedPerson = clone(person);
    clonedPerson.id = idGen.next().value;
    records.push(clonedPerson);
}

function findById(id) {
    const result = records.find(r => r.id === id);
    return clone(result);
}

function all() {
    return clone(records);
}

export { add, all, findById as byId }