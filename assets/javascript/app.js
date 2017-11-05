$(document).ready(function () {
// display default buttons
	// default buttons are search terms as an array of strings
	var searchTerms = ['pikachu','eevee','mudkip'];
	// create loop to iterate over entire array and display buttons in button section
	for (var i=0; i < searchTerms.length; i++) {
		var btn = $('<button>');
		btn.attr('class','data-search');
		btn.attr('data-value', searchTerms[i]);
		btn.text(searchTerms[i]);
		$('.buttons').append(btn);
	}
// when button is clicked:
	$('.data-search').click(function () {
	// populate gifs for that search term in the gifs section with rating
	var search = $(this).attr('data-value');
	var queryUrl = 'http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=z0JZAoMoAgksWJ8DjBubu52HCcZD3Wbt&limit=10';
		// ajax call
		$.ajax({
			url: queryUrl,
			method: 'GET'
		// iterate over each gif from the response
			// src attr is still image by default, then changed to animate
			// animate value is the gif -- fixed-height
			// still value is a still image -- fixed-height-still
			// state value indicates if the gif is in animation or not
		}).done(function (response) {
			var results = response.data;
			for (var i=0; i < results.length; i++) {
				var gifDiv = $('<div>');
				gifDiv.append('Rating :' + results[i].rating);
				// append new div containing rating and gif to gif section
				$('.gifs').append(gifDiv);
			}

		})
			
		// when a new button is clicked, replace the existing gifs with the new ones
			// ajax call
			// empty gif section
			// append new div containing new gif content
	})
// user form
	// when user submits form:
		// capture input value and add to search term array
		// empty button section
		// loop over search term array to recreate buttons









})
