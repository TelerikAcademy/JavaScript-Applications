var promise1 = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve('one');
    }, 3000);
});

var promise2 = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve(promise1);
    }, 2000);
});

promise2.then(function(data) {
    console.log(data); // 'one'
});