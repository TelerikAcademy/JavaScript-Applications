/* globals require module */

"use strict";

const express = require("express"),
    bodyParser = require("body-parser");


module.exports = function() {
    let app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded(true));
    return app;
};