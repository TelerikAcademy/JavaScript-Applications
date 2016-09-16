/* globals require console*/

"use strict";

let express = require("express"),
    bodyParser = require("body-parser"),
    cors = require("cors");

let app = express();
let peopleControllers = require("./controllers/people");

app.use(bodyParser.json());
app.use(cors());

app.get("/api/people", peopleControllers.getAll)
    .get("/api/people/:id", peopleControllers.getById)
    .post("/api/people", peopleControllers.addNew);

app.listen(8886, function() {
    console.log("Server is running at http://localhost:8886");
});