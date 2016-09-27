/* globals require console */
"use strict";

const express = require("express"),
    bodyParser = require("body-parser"),
    lowdb = require("lowdb"),
    cors = require("cors");

let db = lowdb("./data/data.json");
db._.mixin(require("underscore-db"));

let app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static("public"));

require("./utils/authorize-user")(app, db);

//User routes
let usersController = require("./controllers/users-controller")(db);
app.get("/api/users", usersController.get);
app.post("/api/users", usersController.post);
app.put("/api/auth", usersController.put);

// Fortune cookies
let cookiesController = require("./controllers/cookies-controller")(db);
app.get("/api/cookies", cookiesController.get);
app.post("/api/cookies", cookiesController.post);
app.put("/api/cookies/:id", cookiesController.put);
//
// My fortune cookies
let myCookiesController = require("./controllers/my-cookies-controller")(db);
app.get("/api/my-cookie", myCookiesController.get);

// Categories
let categoriesController = require("./controllers/categories-controller")(db);
app.get("/api/categories", categoriesController.get);


let port = 3000;
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));