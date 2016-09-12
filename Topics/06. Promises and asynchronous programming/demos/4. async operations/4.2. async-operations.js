// try to print 1 line each 2 seconds
(function(){
    function pause(delay) {
        setTimeout(function() {
            console.log('paused for ' + delay + 'ms');
        }, delay);
    }

    console.log('start');
    pause(2000);
    console.log('middle');
    pause(2000);
    console.log('end');
    // looks nice, but it doesn't work
    // setTimeout is async
}());

// with callbacks
/*
(function() {
    function pause(delay, callback) {
        setTimeout(function() {
            console.log('paused for ' + delay + 'ms');
            callback();
        }, delay);
    }

    console.log('start');
    pause(1000, function() {
        console.log('middle');
        pause(1000, function () {
            console.log('end')
        });
    });

}());
*/

// with generators
/*
(function(){
    var async = (function(){
        var sequence,
            run = function(generator) {
                sequence = generator();
                var next = sequence.next();
            },
            resume = function() {
                sequence.next();
            };

        return {
            run: run,
            resume: resume
        }
    }());

    function pause(delay) {
        setTimeout(function() {
            console.log('paused for ' + delay + 'ms');
            //async.resume();
        }, delay);
    }

    function* main() {
        console.log('start');
        yield pause(1000);
        console.log('middle');
        yield pause(1000);
        console.log('end');
    }

    //async.run(main);
    main()
}());
