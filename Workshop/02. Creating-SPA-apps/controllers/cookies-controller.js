/* globals require module */
"use strict";

const _ = require("lodash");

const DEFAULT_COOKIE_IMAGE = "https://dayinthelifeofapurpleminion.files.wordpress.com/2014/12/batman-exam.jpg";

module.exports = function(db) {
    function get(req, res) {
        let cookies = _.chain(db("cookies"))
            .sortBy(cookie => -cookie.likes || (cookie.postDate - 0));

        res.send({
            result: cookies
        });
    }

    function post(req, res) {
        let user = req.user;

        if (!user) {
            return res.status(401)
                .send("User not authorized");
        }

        let cookie = req.body;

        cookie.userId = user.id;
        cookie.likes = 0;
        cookie.dislikes = 0;
        cookie.img = cookie.img || DEFAULT_COOKIE_IMAGE;
        cookie.shareDate = new Date();

        db("cookies").insert(cookie);

        return res.status(201)
            .send({
                result: cookie
            });
    }

    function put(req, res) {
        let user = req.user;

        if (!user) {
            return res.status(401)
                .send("User not authorized");
        }

        let cookieId = req.params.id;
        let cookie = db("cookies").find({
            id: cookieId
        });

        if (!cookie) {
            return res.status(404)
                .send("Invalid cookie ID");
        }

        let type = req.body.type;
        if (["like", "dislike"].indexOf(type) < 0) {
            return res.status(400)
                .send("Request type must be either like or dislike");
        }

        if (req.body.type === "like") {
            cookie.likes += 1;
        } else {
            cookie.dislikes += 1;
        }

        db.save();

        return res.send({
            result: cookie
        });
    }

    return {get, post, put };
};