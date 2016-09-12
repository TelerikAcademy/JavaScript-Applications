var httpRequest = function() {
  'use strict';

  function send(options) {
    let httpRequest = new XMLHttpRequest();
    options.method = options.method || 'GET';
    options.url = options.url || '';

    httpRequest.open(options.method, options.url, true);

    options.headers = options.headers || {};

    for (let header in options.headers) {
      if (options.headers.hasOwnProperty(header)) {
        httpRequest.setRequestHeader(header, options.headers[header]);
      }
    }

    var promise = new Promise(function(resolve, reject) {
      httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
          var statusType = (httpRequest.status / 100) | 0;
          switch (statusType) {
            case 2:
              if (options.success) {
                options.success(httpRequest.responseText);
              } else {
                resolve(httpRequest.responseText);
              }
              break;
            case 4:
            case 5:
              if (options.error) {
                options.error(httpRequest.statusText)
              } else {
                reject(httpRequest.statusText);
              }
          }
        }
      };
    });
    httpRequest.send(null);
    return promise;
  }

  function post(options) {
    options = Object.create(options);
    options.method = 'POST';
    return send(options);
  }

  function get(options) {
    options = Object.create(options);
    options.method = 'GET';
    return send(options);
  }

  function getJSON(options) {
    options = Object.create(options);
    options.method = 'GET';
    options.headers = options.headers || {};
    options.headers['content-type'] = 'application/json';
    options.headers['accepts'] = 'application/json';
    return send(options)
      .then(function(text) {
        return JSON.parse(text);
      });
  }

  return {
    send,
    post,
    getJSON,
    get: get
  };
}();
