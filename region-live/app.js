
let longitude;
let latitude;

window.addEventListener('load', () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
        })
    }
}) 

function getLocation(){

    getCoords(document.getElementById('address').value);   
}

function getCoords(inputLoc) {
    var apikey = 'YOUR_KEY';
                        
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
    map = L.map('mapDiv').setView([mLat, mLong], 10);
    // set map tiles source
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(map);
    // add marker to the map
    marker = L.marker([mLat, mLong]).addTo(map);
}