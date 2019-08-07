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
            getInitialCountry(latitude, longitude);
            initMap(latitude, longitude);
            getWeather(latitude, longitude);
        })
    }
}) 

function getLocation(){
    getCoords(document.getElementById('address').value);
    document.getElementById('address').value = "";
}

function getCoords(inputLoc) {
    var apikey = 'XXXXXXXXXXXXXXXXXXXXXXX';
                        
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
        country = data.results[0].components.country;
        getNews(data.results[0].components["ISO_3166-1_alpha-2"])
        initMap(latitude, longitude);
        getWeather(latitude, longitude);
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
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 18,
    }).addTo(map);
    // add marker to the map
    marker.setLatLng([mLat, mLong]).update();
}


function getWeather (mLatitude, mLongitude){

    let tempC = document.querySelector(".temperature-degree");
    let desc = document.querySelector(".temperature-description");

    const heroku = 'https://cors-anywhere.herokuapp.com/';
    const api = `${heroku}https://api.darksky.net/forecast/XXXXXXXXXXXXXXXXXXXXXX/${mLatitude},${mLongitude}`

    fetch(api)
        .then(response =>{
            return response.json();  
        })
        .then(data =>{
            const { temperature , summary, icon } = data.currently;
            tempC.textContent = Math.round((temperature - 32) * (5/9)) + "°C";
            desc.textContent = summary;
            setIcons(icon, document.querySelector('.icon'));
        });
    

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "black"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
};

function getInitialCountry(mLatitude, mLongitude) {
    var API_KEY = `XXXXXXXXXXXX`

    var request_url = `https://api.opencagedata.com/geocode/v1/json?q=${mLatitude}%2C${mLongitude}&key=${API_KEY}&pretty=1`
    var request = new XMLHttpRequest();
    request.open('GET', request_url, true);

    request.onload = function() {

    if (request.status == 200){ 
        var data = JSON.parse(request.responseText);
        getNews(data.results[0].components["ISO_3166-1_alpha-2"]);
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

function getNews(mCountry){
    var url = `https://newsapi.org/v2/top-headlines?country=${mCountry.toLowerCase()}&apiKey=XXXXXXXXXXXXXXXXXXXXXX`;
    var req = new Request(url);
    fetch(req)
        .then(function(response) {
            console.log(response.json());
    })
}