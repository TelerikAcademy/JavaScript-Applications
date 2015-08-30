(function(){
    function* idMaker(){
        var index = 0;
        while(true)
            yield index++;
    }

    var gen = idMaker();
    console.log(gen.next().value); // 0
}());
