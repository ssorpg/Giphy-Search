// GLOBALS
var apiKey = '3dEcVRH1SquXQ50csTRKQnxK8aTT0yxt';
var initialTerms = ['computers', 'games', 'fire emblem', 'anime', 'coding', 'health', 'science']; // Our initial search buttons



// FUNCTIONS
function getGifs(searchTerm) { // Ajax request for our gifs
    let searchURL = 'https://api.giphy.com/v1/gifs/search?q=' + searchTerm + '&limit=10&api_key=' + apiKey; // Set up our api url

    $.ajax({
        url: searchURL,
        method: 'GET'
    }).then(response => {
        let imagesReceived = response.data;

        imagesReceived.forEach(image => {
            addImage(image);
        });

        let sectionDiv = $('<p>').text('Search: ' + searchTerm).addClass('imageDivider'); // Search term divider so we know where each search is
        $('#imageHolder').prepend(sectionDiv);
    });
}

function addImage(image) { // Add image to the page
    let newP = $('<p>').addClass('imageP');

    let ratingP = $('<p>').text('Rating: ' + image.rating);
    let imageP = $('<p>').html('<img src="' + image.images.fixed_height_still.url + '" data-toggleURL="' + image.images.fixed_height.url + '">'); // Start still but put animated data on image

    newP.append(ratingP, imageP);
    $('#imageHolder').prepend(newP);
}

function toggleAnimate(image) { // Toggle gif animation
    let currentSource = image.attr('src');
    let currentToggle = image.attr('data-toggleURL');

    image.attr('data-toggleURL', currentSource);
    image.attr('src', currentToggle);
}

function addSearchButton(searchTerm) { // Add searchTerm to searchTerms bar
    if ($('#searchTerms:contains("' + searchTerm + '")').length < 1) { // If we don't already have this term in the searchTerms header...
        let button = $('<button>').text(searchTerm).addClass('searchButtons'); // Add this term as a button

        $('#searchTerms').append(button);
    }
}



/// PAGE SETUP
$(document).ready(function () {
    initialTerms.forEach(searchTerm => {
        addSearchButton(searchTerm); // Add each initialTerm to the searchTerms bar
    });

    $(document).on('click', '.searchButtons', function () { // If we click a search term...
        let searchTerm = $(this).text();

        getGifs(searchTerm); // Get the gifs!
    });

    $('#searchBar').on('keypress', event => {
        if (event.keyCode == 13) { // If we press enter when our searchBar is in focus...
            let searchTerm = $('#searchBar').val();

            addSearchButton(searchTerm); // Add the term to the searchTerms bar
            getGifs(searchTerm); // Get the gifs!
        }
    });

    $('#manualSearch').on('click', function () { // If we click on the search button...
        let searchTerm = $('#searchBar').val();

        addSearchButton(searchTerm); // Add the term to the searchTerms bar
        getGifs(searchTerm); // Get the gifs!
    });

    $(document).on('click', 'img', function () { // If we click on a gif...
        toggleAnimate($(this)); // Toggle its animation
    });
});