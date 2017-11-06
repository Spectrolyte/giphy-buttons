$(document).ready(function () {
// display default buttons
	// default buttons are search terms as an array of strings
	var searchTerms = ['pikachu','eevee','mudkip','emilia clarke'];

	function generateBtns () {
		// prevents repeat btns
		$('.buttons').empty();
		// create loop to iterate over entire array and display buttons in button section
		for (var i=0; i < searchTerms.length; i++) {
			var btn = $('<button>');
			btn.attr('class','data-search');
			btn.attr('data-value', searchTerms[i]);
			btn.text(searchTerms[i]);
			$('.buttons').append(btn);
		}
		// adds event listener to reproduced buttons
		generateGifs();
	}

	generateBtns();
	
// when button is clicked:
function generateGifs () {
	$('.data-search').click(function () {
	// populate gifs for that search term in the gifs section with rating
	var search = $(this).attr('data-value');
	var queryUrl = 'http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=z0JZAoMoAgksWJ8DjBubu52HCcZD3Wbt&limit=10';
	console.log('hello');
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
				gifDiv.append('Rating :' + gif.rating + '<br>');

				// add class to distinguish gifs
				gifImg.attr('class', 'data-gif');

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

				// add new div containing rating and gif to gif section
				$('.gifs').prepend(gifDiv);
			}

				// when mouse hovers on the still image, animate to gif
				// when mouse hovers off the gif, change to still image
				$('.data-gif').mouseenter(toggle).mouseleave(toggle);
		});	
	});
}

	function toggle () {
		var state = $(this).attr('data-status');
		console.log(state);
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

// user form
	// when user submits form:
		// capture input value and add to search term array
		// empty button section
		// loop over search term array to recreate buttons
$('.search').click(function (event) {
	event.preventDefault();
	var userInput = $('#search-query').val();
	searchTerms.push(userInput);
	generateBtns();
});













})
