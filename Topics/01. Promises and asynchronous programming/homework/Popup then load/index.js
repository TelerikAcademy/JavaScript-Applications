const promisePopup = function () {
    return new Promise((resolve, reject) => {
        const $popup = $('#popup');
        if($popup.css('display') === 'block'){
            resolve('Here is the popup');
        } else {
            reject('Error with the popup');
        }
    })
};

const promiseRedirect = function (message) {
    return new Promise((resolve) => {
            setTimeout(() => {
                window.location.replace('http://www.telerikacademy.com');
                resolve(message + ' go and learn some code');
            }, 2000);
    })
};

promisePopup().then((result) => {
    return promiseRedirect(result);
}).then((result) => {
   console.log(result + ' end');
}).catch(function(result) {
    console.log(result)
});