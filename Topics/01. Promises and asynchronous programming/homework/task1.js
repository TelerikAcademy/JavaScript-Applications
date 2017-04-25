const mapImage = document.getElementById("map-image");

let currentLocation = new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(position =>
        resolve(position), () => reject('Error recieving the location'))
).then(position => {
        let lat = position.coords.latitude,
            lon = position.coords.longitude,
            src = `http://maps.googleapis.com/maps/api/staticmap?center=
    ${lat},${lon}&zoom=18&size=500x500&sensor=true`;
        mapImage.setAttribute('src', src);
    },
    position => console.log(position)
);