(function() {
    var locationElement = document.getElementById("location-element");

    function showLocation(geoPositionFunc) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                parseCoords(position, geoPositionFunc,
                    function(errorMessage) {
                        console.log("Could not parse coords: " + errorMessage);
                    });
            },
            function(error) {
                console.log("Could not access geolocation: " + error);
            });
    }

    function parseCoords(geoPosition, success, error) {
        if (geoPosition.coords) {
            var latAndLong = { lat: geoPosition.coords.latitude, long: geoPosition.coords.longitude };
            success(latAndLong);
        } else {
            error("Could not fing coords object. Are you sure you are passing a navigator.geolocation.getCurrentPosition result?");
        }
    }

    function createGeolocationImage(coordsObj) {
        var imgElement = document.createElement("img");

        var imgSrc = "http://maps.googleapis.com/maps/api/staticmap?center=" + coordsObj.lat + "," + coordsObj.long + "&zoom=13&size=500x500&sensor=false";

        imgElement.setAttribute("src", imgSrc);

        locationElement.appendChild(imgElement);
    }

    showLocation(createGeolocationImage);

    setInterval(function() {
        var currentDateTime = new Date();
        document.getElementById("clock").innerHTML = currentDateTime.getHours() +
            ":" + currentDateTime.getMinutes() + ":" + currentDateTime.getSeconds();
    }, 1000);
}());