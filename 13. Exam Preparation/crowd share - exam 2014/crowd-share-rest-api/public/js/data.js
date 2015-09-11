// data.js
import 'jquery'
import requester from 'js/requester.js'
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
            var authcode = encode(username, password),
                data = {
                    username: username,
                    authCode: authcode
                };

            return requester.postJSON('/user', data);
        },
        login: function(username, password) {
            var authcode = encode(username, password),
                data = {
                    username: username,
                    authCode: authcode
                };

            return requester.postJSON('/auth', data)
            .then(function(data) {
                setSessionKey(data.sessionKey);
                return data.username;
            })
        },
        logout: function() {
            var headers = { 'X-SessionKey': getSessionKey() };

            return requester.putJSON('/user/', null, headers)
                .then(function() {
                    return removeSessionKey();
                });
        },
        current: function() {
            return getSessionKey();
        }
    },
    posts: {
        all: function() {
            // TODO: get query string
            return requester.get('/post');
        },
        add: function(title, body) {
            var data = { title, body },
                headers = { 'X-SessionKey': getSessionKey() };

            return requester.postJSON('/post', data, headers);
        }
    }
}