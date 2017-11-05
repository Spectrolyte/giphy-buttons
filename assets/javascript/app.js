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
	var queryUrl = 'http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=z0JZAoMoAgksWJ8DjBubu52HCcZD3Wbt&limit=5';
		// ajax call
		$.ajax({
			url: queryUrl,
			method: 'GET'
		}).done(function (response) {
			var results = response.data;
			// iterate over each gif from the response
			for (var i=0; i < results.length; i++) {
				var gif = results[i];

				var gifDiv = $('<div>');
				var gifImg = $('<img>');

				// rating above the presented gif
				gifDiv.append('Rating :' + gif.rating);

				// add still image of gif -- default
				gifImg.attr('src', gif.images.fixed_height_still.url);

				// still value is a still image -- fixed-height-still
				gifImg.attr('data-still', gif.images.fixed_height_still.url);

				// animate value is the gif -- fixed-height
				gifImg.attr('data-animate', gif.images.fixed_height.url);

				// state value indicates if the gif is in animation or not
				gifImg.attr('data-status', 'still');

				// add gif image tag to the gif div
				gifDiv.append(gifImg);

				// append new div containing rating and gif to gif section
				$('.gifs').prepend(gifDiv);
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
