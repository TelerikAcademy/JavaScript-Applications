(function () {
    'strict mode';
    var doSomething = function () {
        console.log('im doing something');
    };

    return {
        doSomething: doSomething
    };
}());