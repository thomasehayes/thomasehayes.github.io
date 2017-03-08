$(document).ready(function(){
	"use strict";
//===========================================================================
//   Setting up Openweathermap 
//===========================================================================  

	var APPID = "7f8e3aa0aad113510e0c1eaafd1c17b8";
	var url = "https://api.openweathermap.org/data/2.5/forecast/daily";
	var lat = 29.4241;
	var lon = -98.4936;
	
//===========================================================================
//   AJAX Request to Openweathermap API to return a Weather Object
//===========================================================================

	function getWeather(location) {
		$.get(url, {
			APPID: APPID,
			q: location,
			lat: lat,
			lon: lon,
			cnt: 3,
			units: "imperial"

		}).fail(function(data, status) {
			alert("Failed to load:" + status);

		}).done(function(weather) {
			$("#city").html(weather.city.name);

			showWeather(weather.list);
		});
	}
	function showWeather(forecasts) {
		var htmlString ="";

		forecasts.forEach(function(forecast,index){
			htmlString += "<div class='weatherBox col-md-4'><h4>Day " + (index + 1)+"</h4>";
			htmlString += "<p id='temp'>" + parseInt(forecast.temp.max) + "&deg" + "/" + parseInt(forecast.temp.min) + "&deg" + "</p>"
			htmlString += ("<img src = 'http://openweathermap.org/img/w/" + forecast.weather[0].icon + ".png'>");
			htmlString += "<p><strong>" + (forecast.weather[0].main) + ":</strong> " +(forecast.weather[0].description) + "</p>"
			htmlString += "<p><strong>" + "Humidity:</strong> " + (forecast.humidity) +"%" + "</p>"
			htmlString += "<p><strong>" + "Wind:</strong> " + (forecast.speed) + "mph</p>"
			htmlString += "<p><strong>" + "Pressure:</strong> " + (forecast.pressure) + " mb" + "</p>"
			htmlString += "</div>";
		});

		$("#displayForecast").html(htmlString);
	}

	getWeather("San Antonio");

//===========================================================================
//   Search Button for New City 
//===========================================================================

	$("#searchBtn").click(function(){
		var location = $("#q").val();
		getWeather(location);
	});

//===========================================================================
//   Clears Out Search after hitting Enter Key
//===========================================================================

	$("body").keyup(function(e){
		if(e.keyCode == 13) {
		var location = $("#q").val();
		getWeather(location);
		$("#q").val("");
	}
	});

//===========================================================================
//   Setting up Google Map API
//===========================================================================

// Set our map options

	var mapOptions = {
	
// Set the zoom level

		zoom: 11,
	
// This sets the center of the map at our location

		center: {
			lat: 29.4241,
			lng: -98.4936
		}
	};

// Render the map
	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

// Create lat and long for our marker position

	var sanAntonio = { lat: 29.4241, lng: -98.4936 };
	
// Add the marker to our existing map

	var marker = new google.maps.Marker({
		position: sanAntonio,
		map: map,
		draggable: true
	});


//===========================================================================
//   Changes Marker Location
//===========================================================================

	var searchBox = new google.maps.places.SearchBox(document.getElementById("q"));

	google.maps.event.addListener(searchBox, "places_changed", function(){
		var places = searchBox.getPlaces();

		var bounds = new google.maps.LatLngBounds();
		var i, places;

		for(i=0; places = places[i]; i++) {
			bounds.extend(places.geometry.location);
			marker.setPosition(places.geometry.location);

		}

		map.fitBounds(bounds);
		map.setZoom(11);

	});

//===========================================================================
//   Drag Marker Location and Update Weather 
//===========================================================================

	google.maps.event.addListener(marker, "dragend", function(){
		
		lat = marker.getPosition().lat();
		lon = marker.getPosition().lng();

		getWeather();

	});
});

