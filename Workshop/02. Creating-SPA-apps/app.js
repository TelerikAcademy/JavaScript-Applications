/* globals require process console */

"use strict";

let db = require("./db");

let app = require("./config/express")();

require("./config/routes")(app, db);

let port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App running at ${port}`));