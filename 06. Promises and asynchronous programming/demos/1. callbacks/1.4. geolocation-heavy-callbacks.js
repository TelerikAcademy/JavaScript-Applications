(function(){
    var locationElement = document.getElementById("location-element");

    function visualizeGeolocation(imageCreationFunction) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                parseLatAndLongCoords(position, imageCreationFunction,
                    function (errorMessage) {
                        console.log("Could not parse coords: " + errorMessage);
                    });
            },
            function (error) {
                console.log("Could not access geolocation: " + error);
            });
    }

    function parseLatAndLongCoords(geolocationPosition, success, error) {
        if (geolocationPosition.coords) {
            var latAndLong = { lat: geolocationPosition.coords.latitude, long: geolocationPosition.coords.longitude };
            success(latAndLong);
        }
        else {
            error("Could not fing coords object. Are you sure you are passing a navigator.geolocation.getCurrentPosition result?");
        }
    }

    function createGeolocationImage(coordsObj) {
        var imgElement = document.createElement("img");

        var imgSrc = "http://maps.googleapis.com/maps/api/staticmap?center=" + coordsObj.lat + "," + coordsObj.long + "&zoom=13&size=500x500&sensor=false";

        imgElement.setAttribute("src", imgSrc);

        locationElement.appendChild(imgElement);
    }

    visualizeGeolocation(createGeolocationImage);

    setInterval(function () {
        var currentDateTime = new Date();
        document.getElementById("clock").innerHTML = currentDateTime.getHours() +
            ":" + currentDateTime.getMinutes() + ":" + currentDateTime.getSeconds();
    }, 1000);
}());