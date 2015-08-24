(function(){
    function* powGenerator() {
        var result = Math.pow(yield "a", yield "b");
        return result;
    }

    var g = powGenerator();
    g.next().value;
    g.next(10).value;
    g.next(2).value;
}());