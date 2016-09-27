/* globals require module */
"use strict";

var _ = require("lodash");

module.exports = function(db) {
    function get(req, res) {
        var categories =
            _.chain(db("cookies"))
            .map(cookie => cookie.category)
            .uniq()
            .value();

        res.json({
            result: categories
        });
    }

    return {get };
};