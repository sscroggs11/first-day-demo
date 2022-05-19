// wikiapi.js, created by Adam Parent, 10 May 2022.

var cityName =document.getElementsByTagName("input")[0].value;  //To be pulled from either input or Sam's API after validation - should be pre-trimmed
const wikiUsername = "arparent";  //Required for API - registered username for Adam Parent.
var cityNameText = document.getElementById('city-name-text');       //Todo - Create this element in HTML.
var wikiText = document.getElementById('wiki-text');                //Todo - Create this element in HTML.

function getWikiApi(cityName) {                         //Takes the city name and returns a matching summary from Wikipedia.
    cityNameText.textContent = cityName;                //Display the city name on the page without alteration.
    cityNameArr = cityName.split(" ");                  //Parse out any spaces in the city name - they cannot be in the URL.
    var wikiCityName = "";                                   //Creates a string for city name in the URL.
    for (var i = 0; i < cityNameArr.length; i++){       //Re-assembles the city name string, replacing spaces with "%20".
        wikiCityName = wikiCityName.concat(cityNameArr[i]);
        if((i + 1) < cityNameArr.length)
            wikiCityName = wikiCityName.concat("%20");
        else
            break;
    }
    var wikiApiURL = "https://secure.geonames.org/wikipediaSearchJSON?q=" + wikiCityName + "&maxRows=1&username=" + wikiUsername;   //Build the URL
    fetch(wikiApiURL)
      .then(function (response) {
        if (response.status < 200 || response.status >= 400) {                  //Check Status - if not in 300 range, return error message.
          wikiText.textContent = "Response Error Code: " + response.status;     //Todo - See if API returns any status messages, append if provided.
        }                                                                       //Todo - If no data available, "summary not available" message instead.
        return response.json();
      })
      .then(function (data) {
        wikiText.textContent = data.geonames[0].summary;                           //If no error, populate text with result.
      });
}

getWikiApi(cityName);

document.getElementById("search-button").addEventListener("click",getWikiApi)
