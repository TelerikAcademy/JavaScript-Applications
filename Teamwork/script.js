/*jshint esversion: 6 */

//---------------------------------
//Another module

let $root = $('.root'),
    $input = $root.append('<input class="input-field" type="text" name="Stock index"/>'),
    $btn = $root.append('<button>Check it out</button>');


$btn.on('click', showAdvice)

function showAdvice() {
    stock = $('.input-field').val();
    interpreteIndicators(responsesCleanArr, tankenSen, kijunSen, senkouSpanA, senkouSpanB, chikouSpan);
}

//--------------------------------



let stock = 'ibm',
    periods = '6',
    periodType = 'm';
var xhr = new XMLHttpRequest();
xhr.open('GET',
    `https://query.yahooapis.com/v1/public/yql?q=select%20*%20` +
    `from%20csv%20where%20url%3D'https%3A%2F%2Fchartapi.finance.yahoo.com` +
    `%2Finstrument%2F1.0%2F` +
    `${stock}` +
    `%2Fchartdata%3Btype%3Dquote%3Brange%3D` +
    `${periods}${periodType}` +
    `%2Fcsv'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`, false)
xhr.send();

let responsesAllArr = JSON.parse(xhr.response),
    responsesCleanArr = clearResponse(responsesAllArr),
    tankenSenNow = tankenSen(responsesCleanArr),
    kijunSenNow = kijunSen(responsesCleanArr),
    senkouSpanANow = senkouSpanA(responsesCleanArr),
    senkouSpanBNow = senkouSpanB(responsesCleanArr),
    chikouSpanNow = chikouSpan(responsesCleanArr);

// console.log(responsesCleanArr[0]);
console.log('price: ' + responsesCleanArr[0].close);
console.log('tankenSen: ' + tankenSenNow);
console.log('kijunSen: ' + kijunSenNow);
console.log('senkouSpanA: ' + senkouSpanANow);
console.log('senkouSpanB: ' + senkouSpanBNow);
console.log('chikouSpan: ' + chikouSpanNow);


interpreteIndicators(responsesCleanArr, tankenSen, kijunSen, senkouSpanA, senkouSpanB, chikouSpan);



//Calculating the cloud
function tankenSen(arr) {
    let tankenSen = 0,
        high = 0,
        low = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < 9; i += 1) {
        if (arr[i].high > high) {
            high = arr[i].high;
        }
        if (arr[i].low < low) {
            low = arr[i].low;
        }
    }
    tankenSen = ((+low) + (+high)) / 2;
    return +tankenSen.toFixed(4);
}

function kijunSen(arr) {
    let tankenSen = 0,
        high = 0,
        low = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < 26; i += 1) {
        if (arr[i].high > high) {
            high = arr[i].high;
        }
        if (arr[i].low < low) {
            low = arr[i].low;
        }
    }
    tankenSen = ((+low) + (+high)) / 2;
    return +tankenSen.toFixed(4);
}

function senkouSpanA(arr) {
    arr = arr.slice(26);
    result = (tankenSen(arr) + kijunSen(arr)) / 2
    return +result.toFixed(4);
}

function senkouSpanB(arr) {
    arr = arr.slice(26);
    let tankenSen = 0,
        high = 0,
        low = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < 52; i += 1) {
        if (arr[i].high > high) {
            high = arr[i].high;
        }
        if (arr[i].low < low) {
            low = arr[i].low;
        }
    }
    tankenSen = ((+low) + (+high)) / 2;
    return +tankenSen.toFixed(4);
}

function chikouSpan(arr) {
    result = arr[25].high;
    return +result;
}


// Interpreting the results
function interpreteIndicators(arr, tankenSen, kijunSen, senkouSpanA, senkouSpanB, chikouSpan) {

    const firstPrice = 40,
        secondPrice = 17,
        thirdPrice = 10,
        fourthPrice = 7,
        fifthPrice = 6;
    let tankenSenNow = tankenSen(arr),
        kijunSenNow = kijunSen(arr),
        senkouSpanANow = senkouSpanA(arr),
        senkouSpanBNow = senkouSpanB(arr),
        chikouSpanNow = chikouSpan(arr),
        price = arr[0].close,
        positivePoints = 0,
        negativePoints = 0,
        aboveTheCloud = (price > tankenSenNow && price > kijunSenNow),
        inTheCloud = ((price > tankenSenNow && price < kijunSenNow) || (price < tankenSenNow && price > kijunSenNow)),
        positiveMultiplicator = 1,
        negativeMultiplicator = 1;
    console.log('Above the cloud: ' + aboveTheCloud);
    console.log('In the cloud: ' + inTheCloud);

    if (aboveTheCloud) {
        positiveMultiplicator = 1.5;
    } else if (inTheCloud) {

    } else {
        negativeMultiplicator = 1.5;
    }

    // First indicator (is the price above the cloud)
    if (price > tankenSenNow && price > kijunSenNow) {
        positivePoints += firstPrice;
    } else if (price < tankenSenNow && price < kijunSenNow) {
        negativePoints -= firstPrice;
    }

    // Second indicator (is the cloud green)
    if (senkouSpanANow > senkouSpanBNow) {
        positivePoints += secondPrice * positiveMultiplicator * negativeMultiplicator;
    } else {
        negativePoints -= secondPrice * positiveMultiplicator * negativeMultiplicator;
    }

    // Third indicator (If the price is above or below the Base line)
    if (price > kijunSenNow) {
        positivePoints += thirdPrice * positiveMultiplicator * negativeMultiplicator;
    } else {
        negativePoints -= thirdPrice * positiveMultiplicator * negativeMultiplicator;
    }

    // Fourth indicator (if the Conversion line(Tenkan-sen) is above the Base line(Kijun-sen) )
    if (tankenSenNow > kijunSenNow) {
        positivePoints += fourthPrice * positiveMultiplicator * negativeMultiplicator;
    } else {
        negativePoints -= fourthPrice * positiveMultiplicator * negativeMultiplicator;
    }

    // Fifth indicator (if the price 26 periods from now is higher than current price)
    if (price > chikouSpanNow) {
        positivePoints += fifthPrice * positiveMultiplicator * negativeMultiplicator;
    } else {
        negativePoints -= fifthPrice * positiveMultiplicator * negativeMultiplicator;
    }

    console.log(positivePoints);
    console.log(negativePoints);

    console.log('total: ' + (positivePoints + negativePoints));
}


//Filtering prices only from the responce
function clearResponse(responseAll) {
    let valuesArray = [],
        data = responseAll.query.results.row;

    data.forEach(el => {

        //check if value is only numbers => so it is the correct row
        if (/^\d+$/.test(el.col0)) {

            let obj = {
                'close': el.col1,
                'high': el.col2,
                'low': el.col3,
                'open': el.col4
            };
            valuesArray.push(obj);
        }
    });
    return valuesArray.reverse();
}