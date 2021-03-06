$(document).ready(function () {

	// default buttons are search terms as an array of strings
	var searchTerms = ['corgis','pusheen','sushi','samurai champloo','sleep'];

	function generateBtns () {
		// prevents repeat btns
		$('.buttons').empty();
		// create loop to iterate over entire array and display buttons in button section
		for (var i=0; i < searchTerms.length; i++) {
			var btn = $('<button>');
			btn.attr('class','data-search btn btn-default');
			btn.attr('data-value', searchTerms[i]);
			btn.text(searchTerms[i]);
			$('.buttons').append(btn);
		}
		// adds event listener to reproduced buttons
		generateGifs();
	}
	
	// when button is clicked:
	function generateGifs () {
		$('.data-search').click(function () {
		// populate gifs for that search term in the gifs section with rating
		var search = $(this).attr('data-value');
		var queryUrl = 'http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=z0JZAoMoAgksWJ8DjBubu52HCcZD3Wbt&limit=10';
			// ajax call
			$.ajax({
				url: queryUrl,
				method: 'GET'
			}).done(function (response) {
				// empty gif section -- want to replace old gifs with the new ones
				$('.gifs').empty();

				var results = response.data;
				// iterate over each gif from the response
				for (var i=0; i < results.length; i++) {
					var gif = results[i];

					var gifDiv = $('<div>');
					var gifImg = $('<img>');

					// rating above the presented gif
					gifDiv.prepend('<br>Rating: ' + gif.rating);

					// add class to distinguish gifs
					gifImg.attr('class', 'center-block data-gif');

					// add still image of gif -- default
					gifImg.attr('src', gif.images.fixed_height_still.url);

					// still value is a still image -- fixed-height-still
					gifImg.attr('data-still', gif.images.fixed_height_still.url);

					// animate value is the gif -- fixed-height
					gifImg.attr('data-animate', gif.images.fixed_height.url);

					// state value indicates if the gif is in animation or not
					gifImg.attr('data-status', 'still');

					// add gif image tag to the gif div
					gifDiv.prepend(gifImg);

					// add new div containing rating and gif to gif section
					$('.gifs').prepend('<hr>').prepend(gifDiv);
				}

					// when mouse hovers on the still image, animate to gif
					// when mouse hovers off the gif, change to still image
					$('.data-gif').mouseenter(toggle).mouseleave(toggle);
			});	
		});
	}

	function toggle () {
		var state = $(this).attr('data-status');
		// if state is still, change state to animate and src to data-animate
		if (state === 'still') {
			$(this).attr('src',$(this).attr('data-animate'));
			$(this).attr('data-status','animate');
		}
		// else, change src to data-still
		else {
			$(this).attr('src',$(this).attr('data-still'));
			$(this).attr('data-status','still');
		}
	}

	// when user submits form:
	$('.search').click(function (event) {
		event.preventDefault();
		// capture input value and add to search term array
		var userInput = $('#search-query').val();
		searchTerms.push(userInput);
		// regenerates default buttons along with new one
		generateBtns();
		// clear input text
		$('#search-query').val('');
	});

	// display default buttons when the page is loaded
	generateBtns();

})
