function initAutocomplete() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -33.8688, lng: 151.2195 },
    zoom: 13,
    mapTypeId: "roadmap",
  });
  // Create the search box and link it to the UI element.
  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

window.initAutocomplete = initAutocomplete;

// var cityName="seattle"; //get from input
var clientID= "nkyJu8Y-bgOpyEvKdevXhji09H6_azi1OlFzFM9W0-Y";

window.addEventListener('load', loadImage(place.name));

function loadImage(place.name) {
  var cityUrl = "https://api.unsplash.com/search/photos?query=" + place.name + "&page=1&per_page=1&client_id=" + clientID;
  console.log(cityUrl);
    fetch(cityUrl)
        .then(function (response){
            return response.json();
        })
        .then(function(data) {
            var imageElement = document.querySelector('#showimage');
            imageElement.src=data.results[0].urls.thumb;
        });

}

// var cityName = "";  //To be pulled from either input or Sam's API after validation - should be pre-trimmed
const wikiUsername = "arparent";  //Required for API - registered username for Adam Parent.
var cityNameText = document.getElementById('city-name-text');       //Todo - Create this element in HTML.
var wikiText = document.getElementById('wiki-text');                //Todo - Create this element in HTML.

function getWikiApi(place.name) {                         //Takes the city name and returns a matching summary from Wikipedia.
    cityNameText.textContent = place.name;                //Display the city name on the page without alteration.
    cityNameArr = place.name.split(" ");                  //Parse out any spaces in the city name - they cannot be in the URL.
    wikiCityName = "";                                  //Creates a string for city name in the URL.
    for (var i = 0; i < place.nameArr.length; i++){       //Re-assembles the city name string, replacing spaces with "%20".
        wikiCityName.concat(place.nameArr[i]);
        if((i + 1) < place.nameArr.length)
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
