import 'jquery'

export default {
    get: function (url, headers) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                type: 'GET',
                headers: headers,
                success: function(data) { resolve(data) },
                error: function(err) { reject(err) }
            })
        })
    },
    postJSON: function (url, data, headers) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                type: 'POST',
                headers: headers,
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(data) { resolve(data) },
                error: function(err) { reject(err) }
            })
        });
    },
    putJSON: function (url, data, headers) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                type: 'PUT',
                headers: headers,
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(data) { resolve(data) },
                error: function(err) { reject(err) }
            })
        });
    }
}