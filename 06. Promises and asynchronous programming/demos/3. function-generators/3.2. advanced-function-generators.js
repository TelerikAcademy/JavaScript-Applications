(function(){
    function* fibonacci(){
        var fn1 = 1, fn2 = 1, currnet, reset;
        while (true){
            current = fn2;
            fn2 = fn1;
            fn1 = fn1 + current;
            reset = yield current;
            if (reset){
                fn1 = 1;
                fn2 = 1;
            }
        }
    }

    var sequence = fibonacci();
    console.log(sequence.next().value);     // 1
    console.log(sequence.next().value);     // 1
    console.log(sequence.next().value);     // 2
    console.log(sequence.next().value);     // 3
    console.log(sequence.next().value);     // 5
    console.log(sequence.next().value);     // 8
    console.log(sequence.next().value);     // 13
    console.log(sequence.next(true).value); // 1
    console.log(sequence.next().value);     // 1
    console.log(sequence.next().value);     // 2
    console.log(sequence.next().value);     // 3
}());