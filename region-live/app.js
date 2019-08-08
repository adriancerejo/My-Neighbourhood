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
    var apikey = 'XXXXXXXXXXXXXXXXX';
            
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
        console.log(data);
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
    
    let day1 = document.querySelector(".day1-day");
    let day1High = document.querySelector(".day1-high");
    let day1Low = document.querySelector(".day1-low");

    let day2 = document.querySelector(".day2-day");
    let day2High = document.querySelector(".day2-high");
    let day2Low = document.querySelector(".day2-low");
    
    let day3 = document.querySelector(".day3-day");
    let day3High = document.querySelector(".day3-high");
    let day3Low = document.querySelector(".day3-low");
    
    let day4 = document.querySelector(".day4-day");
    let day4High = document.querySelector(".day4-high");
    let day4Low = document.querySelector(".day4-low");
    
    let day5 = document.querySelector(".day5-day");
    let day5High = document.querySelector(".day5-high");
    let day5Low = document.querySelector(".day5-low");
    
    let day6 = document.querySelector(".day6-day");
    let day6High = document.querySelector(".day6-high");
    let day6Low = document.querySelector(".day6-low");
    
    let day7 = document.querySelector(".day7-day");
    let day7High = document.querySelector(".day7-high");
    let day7Low = document.querySelector(".day7-low");


    const heroku = 'https://cors-anywhere.herokuapp.com/';
    const api = `${heroku}https://api.darksky.net/forecast/XXXXXXXXXXXXXXXXXX/${mLatitude},${mLongitude}`

    fetch(api)
        .then(response =>{
            return response.json();  
        })
        .then(data =>{
            const { temperature , summary, icon } = data.currently;

            let icon1 = data.daily.data[1].icon;
            let icon2 = data.daily.data[2].icon;
            let icon3 = data.daily.data[3].icon;
            let icon4 = data.daily.data[4].icon;
            let icon5 = data.daily.data[5].icon;
            let icon6 = data.daily.data[6].icon;
            let icon7 = data.daily.data[7].icon;

            tempC.textContent = Math.round((temperature - 32) * (5/9)) + "°C";
            desc.textContent = summary;

            day1High.textContent = "High: " + Math.round((data.daily.data[1].apparentTemperatureHigh - 32) * (5/9)) + "°C";
            day1Low.textContent = "Low: " + Math.round((data.daily.data[1].apparentTemperatureLow - 32) * (5/9)) + "°C";

            day2High.textContent = "High: " + Math.round((data.daily.data[2].apparentTemperatureHigh - 32) * (5/9)) + "°C";
            day2Low.textContent = "Low: " + Math.round((data.daily.data[2].apparentTemperatureLow - 32) * (5/9)) + "°C";

            day3High.textContent = "High: " + Math.round((data.daily.data[3].apparentTemperatureHigh - 32) * (5/9)) + "°C";
            day3Low.textContent = "Low: " + Math.round((data.daily.data[3].apparentTemperatureLow - 32) * (5/9)) + "°C";

            day4High.textContent = "High: " + Math.round((data.daily.data[4].apparentTemperatureHigh - 32) * (5/9)) + "°C";
            day4Low.textContent = "Low: " + Math.round((data.daily.data[4].apparentTemperatureLow - 32) * (5/9)) + "°C";

            day5High.textContent = "High: " + Math.round((data.daily.data[5].apparentTemperatureHigh - 32) * (5/9)) + "°C";
            day5Low.textContent = "Low: " + Math.round((data.daily.data[5].apparentTemperatureLow - 32) * (5/9)) + "°C";
            
            day6High.textContent = "High: " + Math.round((data.daily.data[6].apparentTemperatureHigh - 32) * (5/9)) + "°C";
            day6Low.textContent = "Low: " + Math.round((data.daily.data[6].apparentTemperatureLow - 32) * (5/9)) + "°C";

            day7High.textContent = "High: " + Math.round((data.daily.data[7].apparentTemperatureHigh - 32) * (5/9)) + "°C";
            day7Low.textContent = "Low: " + Math.round((data.daily.data[7].apparentTemperatureLow - 32) * (5/9)) + "°C";

            
             var dt = new Date();
            daysOfWeek = ["Sunday", "Monday", "Tuesday", 
                        "Wednesday", "Thursday", "Friday", 
                        "Saturday", "Sunday", "Monday", 
                        "Tuesday", "Wednesday", "Thursday", 
                        "Friday", "Saturday"];

            day1.textContent = daysOfWeek[dt.getDay() + 1];
            day2.textContent = daysOfWeek[dt.getDay() + 2];
            day3.textContent = daysOfWeek[dt.getDay() + 3];
            day4.textContent = daysOfWeek[dt.getDay() + 4];
            day5.textContent = daysOfWeek[dt.getDay() + 5];
            day6.textContent = daysOfWeek[dt.getDay() + 6];
            day7.textContent = daysOfWeek[dt.getDay() + 7];

            
            setIcons(icon, document.querySelector('.icon-current'));
            setIcons(icon1, document.querySelector('.icon1'));
            setIcons(icon2, document.querySelector('.icon2'));
            setIcons(icon3, document.querySelector('.icon3'));
            setIcons(icon4, document.querySelector('.icon4'));
            setIcons(icon5, document.querySelector('.icon5'));
            setIcons(icon6, document.querySelector('.icon6'));
            setIcons(icon7, document.querySelector('.icon7'));

        });


    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "black"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
};

function getInitialCountry(mLatitude, mLongitude) {
    var API_KEY = `XXXXXXXXXXXXXXX`

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
    let news1 = document.querySelector(".article1-title");
    let news2 = document.querySelector(".article2-title");
    let desc1 = document.querySelector(".article1-desc");
    let desc2 = document.querySelector(".article2-desc");
    var url1 = document.getElementById("url1");
    var url2 = document.getElementById("url2");
    var img1 = document.getElementById("img1");
    var img2 = document.getElementById("img2");

    let news3 = document.querySelector(".article3-title");
    let news4 = document.querySelector(".article4-title");
    let desc3 = document.querySelector(".article3-desc");
    let desc4 = document.querySelector(".article4-desc");
    var url3 = document.getElementById("url3");
    var url4 = document.getElementById("url4");
    var img3 = document.getElementById("img3");
    var img4 = document.getElementById("img4");

    var url = `https://newsapi.org/v2/top-headlines?country=${mCountry.toLowerCase()}&apiKey=XXXXXXXXXXXXX`;
    var req = new Request(url);
    fetch(req)
    .then(function(response) {
        return response.json();
    })
    .then (function(myJson){
        news1.textContent = myJson.articles[4].title;
        news2.textContent = myJson.articles[8].title; 
        desc1.textContent = myJson.articles[4].description; 
        desc2.textContent = myJson.articles[8].description;           
        url1.setAttribute('href', myJson.articles[4].url);
        url2.setAttribute('href', myJson.articles[8].url);
        img1.src = myJson.articles[4].urlToImage;
        img2.src = myJson.articles[8].urlToImage;

        news3.textContent = myJson.articles[2].title;
        news4.textContent = myJson.articles[3].title; 
        desc3.textContent = myJson.articles[2].description; 
        desc4.textContent = myJson.articles[3].description;           
        url3.setAttribute('href', myJson.articles[2].url);
        url4.setAttribute('href', myJson.articles[3].url);
        img3.src = myJson.articles[2].urlToImage;
        img4.src = myJson.articles[3].urlToImage;

    })

}
