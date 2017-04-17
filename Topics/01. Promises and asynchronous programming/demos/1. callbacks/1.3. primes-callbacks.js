(function() {
    var isPrime = function(number) {
        for (var i = 2; i < number; i++) {
            if (number % i == 0) {
                return false;
            }
        }
        return true;
    };

    var calculatePrimes = function(rangeStart, rangeLast) {
        var currNum = rangeStart;
        var primes = [];

        for (currNum; currNum <= rangeLast; currNum++) {
            if (isPrime(currNum)) {
                primes.push(currNum);
            }
        }

        return primes;
    };

    var displayPrimesAsync = function(rangeStart, rangeEnd, displayFunction) {
        setTimeout(function() {
            var primes = calculatePrimes(rangeStart, rangeEnd);
            displayFunction(primes);
        }, 0);
    };

    var writeArray = function(theArray) {
        var targetElement = document.getElementById("array-display-element");
        targetElement.innerHTML = '';
        targetElement.innerHTML = theArray.join(", ") + " ";
    };

    var calculatePrimesButton = document.getElementById("calculate-primes-button");
    calculatePrimesButton.onclick = function() {
        displayPrimesAsync(2, 100, writeArray);
    }

}());