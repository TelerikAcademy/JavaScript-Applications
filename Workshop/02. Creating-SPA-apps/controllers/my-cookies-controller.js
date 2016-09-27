/* globals require module */
"use strict";

let _ = require("lodash");

module.exports = function(db) {
    function getRandomCookie() {
        let cookies = db("cookies").value();
        let index = Math.floor(Math.random() * cookies.length);
        return cookies[index];
    }

    function get(req, res) {
        let user = req.user;
        if (!user) {
            return res.status(401)
                .send("User not authorized");
        }

        let myCookie;

        if (user.myCookies) {
            myCookie = _.last(user.myCookies);
            let now = new Date().getHours();
            let myCookieTime = myCookie.hours;
            if (myCookieTime !== now) {
                myCookie = getRandomCookie();
            }
        } else {
            myCookie = getRandomCookie();
        }

        user.myCookies = user.myCookies || [];

        myCookie.hours = new Date().getHours();
        user.myCookies.push(myCookie);

        db.save();

        return res.send({
            result: _.last(user.myCookies)
        });
    }

    return {get };
};