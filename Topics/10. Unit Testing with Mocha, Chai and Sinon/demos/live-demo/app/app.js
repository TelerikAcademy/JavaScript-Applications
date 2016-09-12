function sum(numArr) {
    if (!numArr) {
        throw Error();
    }

    var result = 0;
    result = numArr.reduce(function(sum, num) {
        return sum + num;
    }, 0);

    return result;
}
