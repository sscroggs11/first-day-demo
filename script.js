var placeSearch, autocomplete, geocoder;

function initAutocomplete() {
  geocoder = new google.maps.Geocoder();
  autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete')), {
      types: ['geocode']
    });

  autocomplete.addListener('place_changed', fillInAddress);
}


function fillInAddress() {
  var place = autocomplete.getPlace();

  codeAddress(document.getElementById('autocomplete').value);
}

var x =document.getElementById('autocomplete').value

var clientID= "nkyJu8Y-bgOpyEvKdevXhji09H6_azi1OlFzFM9W0-Y";

window.addEventListener('load', loadImage(x));

function loadImage(x) {
  var cityUrl = "https://api.unsplash.com/search/photos?query=" + x + "&page=1&per_page=1&client_id=" + clientID;
  console.log(cityUrl);
  var imageEl = document.querySelector('.image');
    fetch(cityUrl)
        .then(function (response){
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            var imageElement=document.createElement('img');
            imageElement.src=data.results[0].urls.thumb;
            imageEl.append(imageElement);
        });

}
// var cityName = "";  //To be pulled from either input or Sam's API after validation - should be pre-trimmed
const wikiUsername = "arparent";  //Required for API - registered username for Adam Parent.
var cityNameText = document.getElementById('city-name-text');       //Todo - Create this element in HTML.
var wikiText = document.getElementById('wiki-text');                //Todo - Create this element in HTML.

function getWikiApi(x) {                         //Takes the city name and returns a matching summary from Wikipedia.
    cityNameText.textContent = cityName;                //Display the city name on the page without alteration.
    cityNameArr = x.split(" ");                  //Parse out any spaces in the city name - they cannot be in the URL.
    wikiCityName = "";                                  //Creates a string for city name in the URL.
    for (var i = 0; i < cityNameArr.length; i++){       //Re-assembles the city name string, replacing spaces with "%20".
        wikiCityName.concat(xArr[i]);
        if((i + 1) < xArr.length)
            wikiCityName.concat("%20");
        else
            break;
    }
    var wikiApiURL = "http://api.geonames.org/wikipediaSearchJSON?q=" + wikiCityName + "&maxRows=1&username=" + wikiUsername;   //Build the URL
    fetch(wikiApiURL)
      .then(function (response) {
        if (response.status < 200 || response.status >= 400) {                  //Check Status - if not in 300 range, return error message.
          wikiText.textContent = "Response Error Code: " + response.status;     //Todo - See if API returns any status messages, append if provided.
        }                                                                       //Todo - If no data available, "summary not available" message instead.
        return response.json();
      })
      .then(function (data) {
        wikiText.textContent = data.geonames.summary;                           //If no error, populate text with result.
      });
}
