(function() {
    var promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve({id: 5, decription: 'some data'})
            // reject('somethisng very bad happened')
        }, 2000);
    });

    promise
        .then(function(data) {
            console.log(data);
        })
        .catch(function(eror) {
            console.log(eror);
        });
}());