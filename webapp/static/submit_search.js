initialize();

function initialize() {
    var search_input = window.sessionStorage.getItem("search_input");
    console.log(search_input);
    onWinesSearch(search_input);
}

function getBaseURL() {
    var baseURL = window.location.protocol + '//' + window.location.hostname + ':' + api_port;
    return baseURL;
}

function onWinesSearch(search_input) {
    var url = getBaseURL() + '/wines?title=' + search_input;

    // Send the request to the Books API /authors/ endpoint
    fetch(url, {method: 'get'})

    // When the results come back, transform them from JSON string into
    // a Javascript object (in this case, a list of author dictionaries).
    .then((response) => response.json())

    // Once you have your list of author dictionaries, use it to build
    // an HTML table displaying the author names and lifespan.
    .then(function(authorsList) {
        // Build the table body.
        var tableBody = '';
                for (var k = 0; k < 10; k++) {//authorsList.length; k++) {
            tableBody +=    '<div id="wine_of_the_day" class="info_box">' +
                            '<header name="wine_of_the_day" class="wine_of_the_day">Discover Wine</header>'+
                            '<div class="left_box"><p class = "title">' + tableBody['title'] +
                            '</p><p class = "variety"> Variety: ' + tableBody['variety'] +
                            '</p><text class = "winery"> Winery: ' + tableBody['winery'] +
                            '</text><text class = "place"> (' + tableBody['region'] +', '+ tableBody['province'] + ', ' + tableBody['country'] +
                            ')</text><p class = "points"> Points: ' + tableBody['points'] + '/100</p></div>'+
                            '<div class="middle_box"><p class = "description">Review: ' + tableBody['description'] +
                            '</p><text class = "taster_name">' + tableBody['taster_name'] +
                            '</text>  <text class = "taster_twitter_handle">(' + tableBody['taster_twitter_handle'] +
                            ')</text></div>' +
                            '<div class = "right_box">  <text class = "price">$' + tableBody['price'] +
                            '</text></div></div></div>';

        }

        // Put the table body we just built inside the table that's already on the page.
        var resultsTableElement = document.getElementById('results_table');
        if (resultsTableElement) {
            resultsTableElement.innerHTML = tableBody;
        }
    })

    // Log the error if anything went wrong during the fetch.
    .catch(function(error) {
        console.log(error);
    });
}

function get_input() {
    var search_input = document.getElementById("search_bar").value;
    window.sessionStorage.setItem("search_input", search_input);
    return search_input
}
document.getElementById('submit_search').onclick = get_input();

document.getElementById('submit_search').onclick = onWinesSearch(window.sessionStorage.getItem("search_input"));
