// data.js
import 'jquery'
import cookie from 'js/cookie.js'

function encode(username, password) {
    return sha1(username + password)
}

var cookieName = 'sessionKey';
function setSessionKey(sessionKey) {
    cookie.set(cookieName, sessionKey, 10);
}

function getSessionKey() {
    return cookie.get(cookieName);
}

function removeSessionKey() {
    cookie.remove(cookieName);
}

export default {
    users: {
        register: function(username, password) {
            var authcode = encode(username, password);
            return $.ajax({
                url: '/user',
                type: 'post',
                data: {
                    username: username,
                    authCode: authcode
                }
            })
        },
        login: function(username, password) {
            var authcode = encode(username, password);
            return $.ajax({
                url: '/auth',
                type: 'post',
                data: {
                    username: username,
                    authCode: authcode
                }
            })
            .then(function(data) {
                setSessionKey(data.sessionKey);
                return data.username;
            })
        },
        logout: function() {
            return $.ajax({
                url: '/user',
                type: 'put',
                headers: {
                    'X-SessionKey': getSessionKey()
                }
            })
            .then(function() {
                return removeSessionKey();
            })
        },
        current: function() {
            return getSessionKey();
        }
    },
    posts: {
        all: function() {
            // TODO: get query string
            return $.ajax({
                url: '/post',
                type: 'get'
            });
        },
        add: function(title, body) {
            return $.ajax({
                url: '/post',
                type: 'post',
                headers: {
                    'X-SessionKey': getSessionKey()
                },
                data: { title, body }
            })
        }
    }
}