/* globals module require*/

"use strict";

let people = [];

let validator = require("../tools/validator"),
    idGenerator = require("../tools/id-generator").get();

function getAll(req, res) {
    res.json({
        data: people
    });
}

function getById(req, res) {
    let id = +req.params.id;
    let person = people.find(p => p.id === id);

    if (person === null || typeof person === "undefined") {
        return res.status(404)
            .json({
                data: {
                    errMessage: `There is no person with id ${id}`
                }
            });
    }

    return res.json({
        data: person
    });
}

function addNew(req, res) {
    let person = req.body;
    person.isCool = !!person.isCool;

    let result = validator.validatePerson(person);
    if (result === null) {
        person.id = idGenerator.next();
        people.push(person);
        res.status(201)
            .json({
                data: person
            });
    } else {
        res.status(412)
            .json({
                data: result
            });
    }
}

module.exports = {
    getAll,
    getById,
    addNew
};