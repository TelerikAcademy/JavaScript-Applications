(function() {
    var promise1, promise2;

    promise1 = new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('from promise 1');
        }, 2000);
    });

    promise2 = new Promise(function (resolve, reject) {
        resolve('from promise 2');
    });

    Promise.all([promise1, promise2])
        .then(function (results) {
            // results is an array of the responses
            console.log(results);
        });
}());