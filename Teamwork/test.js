/*jshint esversion: 6 */

let $root = $('.root'),
    $listColZero = $root.append($('<ul/>').addClass('list')),
    valuesArray = [],
    arr = $
    .getJSON(
        "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%3D'https%3A%2F%2Fchartapi.finance.yahoo.com%2Finstrument%2F1.0%2Faapl%2Fchartdata%3Btype%3Dquote%3Brange%3D2m%2Fcsv'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=",
        calculate)
    .error(errorHandler);



function calculate(data, textStatus, jqXHR) {
    data = data.query.results.row;
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

            $('.list').append($('<li/>').addClass('item').html(el.col0));
        }
    });
    // console.log(valuesArray.length);
}

function errorHandler() {}

console.log(valuesArray);