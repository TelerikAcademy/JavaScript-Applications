(function() {
    var isPrime = function (number) {
        for (var i = 2; i < number; i++) {
            if (number % i == 0) {
                return false;
            }
        }
        return true;
    };

    var calculatePrimes = function (rangeStart, rangeLast) {
        var currNum;
        var primes = [];

        for (currNum = rangeStart; currNum <= rangeLast; currNum++) {
            if (isPrime(currNum)) {
                primes.push(currNum);
            }
        }

        return primes;
    };

    var displayPrimesAsync = function (rangeStart, rangeEnd, displayFunction) {
        setTimeout(function (rangeStart, rangeEnd) {
            var primes = calculatePrimes(rangeStart, rangeEnd);
            displayFunction(primes);
        }, 0, rangeStart, rangeEnd);
    };

    var writeArray = function (theArray) {
        var targetElement = document.getElementById("array-display-element");
        targetElement.innerHTML += theArray.join(", ") + " ";
    };

    var calculatePrimesButton = document.getElementById("calculate-primes-button");
    calculatePrimesButton.onclick = function () {
        displayPrimesAsync(2, 100000, writeArray);
    }

}());