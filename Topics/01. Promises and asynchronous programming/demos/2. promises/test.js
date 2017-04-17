var promise = new Promise(function(blaa, dee) {
    // do something    
    if (false) {
        blaa('Stuff worked!');
    } else {
        dee(Error('It broke'));
    }
});

promise.then((result) => {
    console.log(result); // "Stuff worked!"
}, (err) => {
    console.log(err); // "It broke"
})