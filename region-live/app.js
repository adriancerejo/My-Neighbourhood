let longitude;
let latitude;

window.addEventListener('load', () =>{
    document.getElementById('address').value = "";
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            map = L.map('mapDiv').setView([latitude, longitude], 10);
            marker = L.marker([latitude, longitude]).addTo(map);
            initMap(latitude, longitude);
        })
    }
}) 

function getLocation(){
    getCoords(document.getElementById('address').value);
    document.getElementById('address').value = "";
}

function getCoords(inputLoc) {
    var apikey = 'YOUR_KEYI';
                        
    var api_url = 'https://api.opencagedata.com/geocode/v1/json'

    var request_url = api_url
    + '?'
    + 'key=' + apikey
    + '&q=' + encodeURIComponent(inputLoc)
    + '&pretty=1'
    + '&no_annotations=1';

    var request = new XMLHttpRequest();
    request.open('GET', request_url, true);

    request.onload = function() {

    if (request.status == 200){ 
        var data = JSON.parse(request.responseText);
        latitude = data.results[0].geometry.lat;
        longitude = data.results[0].geometry.lng;
        console.log(latitude, longitude);
        initMap(latitude, longitude);
    } else if (request.status <= 500){ 
                            
        console.log("unable to geocode! Response code: " + request.status);
        var data = JSON.parse(request.responseText);
        console.log(data.status.message);
    } else {
        console.log("server error");
    }
    };

    request.onerror = function() {
    console.log("unable to connect to server");        
    };

    request.send();  // make the request
}


function initMap(mLat, mLong){
    // initialize map
    map.setView([mLat, mLong], 10);
    // set map tiles source
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(map);
    // add marker to the map
    marker.setLatLng([mLat, mLong]).update();
}


window.addEventListener('load', () =>{
    let longitude;
    let latitude;

    let tempC = document.querySelector(".temperature-degree");
    let desc = document.querySelector(".temperature-description");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            console.log(longitude, latitude);

            const heroku = 'https://cors-anywhere.herokuapp.com/';
            const api = `${heroku}https://api.darksky.net/forecast/YOURKEY/${latitude},${longitude}`
    
       
        fetch(api)
            .then(response =>{
              return response.json();  
            })
            .then(data =>{
                const { temperature} = data.currently;
                const { summary, icon } = data.hourly;
                tempC.textContent = Math.round((temperature - 32) * (5/9)) + "°C";
                desc.textContent = summary;
                setIcons(icon, document.querySelector('.icon'));
                console.log(data);
            });
        });
    }


    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "black"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        console.log(icon, iconID);
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});