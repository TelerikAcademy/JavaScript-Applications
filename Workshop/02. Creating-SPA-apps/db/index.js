/* globals module require */

"use strict";
const low = require("lowdb");

const dbPath = "./db/db.json",
    db = low(dbPath);

db._.mixin(require("underscore-db"));

module.exports = {
    users: require("./users")(db),
    videos: require("./videos")(db)
};