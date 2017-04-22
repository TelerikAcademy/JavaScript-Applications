const checkSupportPromise = function() {
    const location = navigator.geolocation;
    return new Promise((resolve, reject) => {
        if(location) {
        resolve(true);
    } else {
        reject('Geolocation is not supported in this browser');
    }
})
}


const getLocationPromise = function() {
    return new Promise((resolve, reject) => { 
        navigator.geolocation.getCurrentPosition(
            (position) => {resolve(position)},
            (error) => {reject(error)}
        )
    }) 
}

function showPosition(position) {
    const latlon = position.coords.latitude + ',' + position.coords.longitude;
    const image_url = "https://maps.googleapis.com/maps/api/staticmap?center="
    +latlon+"&zoom=14&size=400x300&sensor=false&key=AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU";
    $('#map-holder').html("<img src='" + image_url + "'>");
}

function loading () {
    setTimeout(function() {
    $('#map-holder').html('<img src="http://www.cuisson.co.uk/templates/cuisson/supersize/slideshow/img/progress.BAK-FOURTH.gif">')},
    2000)}


function showError(error) {
    if(error.code == 1) {
        alert('You disallowed tracking you location')
    }
    else if(error.code == 2) {
        alert('Your network is down or the positionign satelites cannot be contacted')
    }
    else if(error.code == 3) {
        alert('It takes too long to calculate your position. Please try again later.')
    }
}

$(document).ready(
    checkSupportPromise()
        .then(loading)
        .then(getLocationPromise)
        .then(showPosition)
        .catch(showError));