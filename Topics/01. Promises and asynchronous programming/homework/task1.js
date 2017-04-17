var geoLocation = navigator.geolocation.getCurrentPosition;

if (geoLocation) {
    console.log(geoLocation);
} else {
    console.log('ERROR');
}