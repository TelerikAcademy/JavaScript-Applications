/* globals module require */
"use strict";

const Router = require("express").Router;

module.exports = function(db) {
    let router = new Router(),
        controller = require("")

    router.get("/", controller.all);
};