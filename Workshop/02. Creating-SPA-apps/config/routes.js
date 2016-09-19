/* globals module require */
"use strict";

module.exports = function(app, db) {
    let usersRouter = require("./controllers/users")(db);
    app.use("/api/users", usersRouter);
};