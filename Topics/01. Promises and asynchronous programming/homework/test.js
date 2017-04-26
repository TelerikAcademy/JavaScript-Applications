//5 divs liting up one after another

let div1 = document.getElementById('div1');
let div2 = document.getElementById('div2');
let div3 = document.getElementById('div3');
let div4 = document.getElementById('div4');
let div5 = document.getElementById('div5');


let promise1 = function () {
    return new Promise(function (resolve) {
        setTimeout(function () {
            div1.style.border = '1px solid black';
            resolve('1 loaded');
        },2000);
    });
};
let promise2 = function () {
    return new Promise(function (resolve) {
        setTimeout(function () {
            div2.style.border = '1px solid black';
            resolve('2 loaded');
        },2000);
    });
};
let promise3 = function () {
    return new Promise(function (resolve) {
        setTimeout(function () {
            div3.style.border = '1px solid black';
            resolve('3 loaded');
        },2000);
    });
};
let promise4 = function () {
    return new Promise(function (resolve) {
        setTimeout(function () {
            div4.style.border = '1px solid black';
            resolve('4 loaded');
        },2000);
    });
};
let promise5 = function () {
    return new Promise(function (resolve) {
        setTimeout(function () {
            div5.style.border = '1px solid black';
            resolve('5 loaded');
        },2000);
    });
};

promise1().then(function (result) {
    console.log(result);
    return promise2();
}).then(function (result) {
    console.log(result);
    return promise3();
}).then(function (result) {
    console.log(result);
    return promise4();
}).then(function (result) {
    console.log(result);
    return promise5();
}).then(function (result) {
    console.log(result + ' aaaand finished');
});