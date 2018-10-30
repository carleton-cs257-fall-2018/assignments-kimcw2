/*
 * books.js
 * Jeff Ondich, 27 April 2016
 * Updated, 4 May 2018
 *
 * A little bit of Javascript showing one small example of AJAX
 * within the "books and authors" sample for Carleton CS257,
 * Spring Term 2017.
 *
 * This example uses a very simple-minded approach to Javascript
 * program structure, which suffers from the problem of
 * "global namespace pollution". We'll talk more about this after
 * you get a feel for some Javascript basics.
 */

// IMPORTANT CONFIGURATION INFORMATION
// The contents of getBaseURL below reflects our assumption that
// the web application (books_website.py) and the API (books_api.py)
// will be running on the same host but on different ports.
//
// But if you take a look at the contents of getBaseURL, you may
// ask: where does the value of api_port come from? The answer is
// a little bit convoluted. (1) The command-line syntax of
// books_website.py includes an argument for the API port;
// and (2) the index.html Flask/Jinja2 template includes a tiny
// bit of Javascript that declares api_port and assigns that
// command-line API port argument to api_port. This happens
// before books.js is loaded, so the functions in books.js (like
// getBaseURL) can access api_port as needed.

initialize();

function initialize() {
    var search_button = document.getElementById('submit_search');
    if (search_button) {
        search_button.onclick = onWinesSearch;
    }
    var random_wine = document.getElementById('wine_of_the_day_button');
    console.log("initialized the random_wine var");
    if (random_wine) {
	      console.log("random wine clicked");
        random_wine.onclick = wine_of_the_day;
    }
}

function wine_of_the_day() {
  var url = getBaseURL() + '/wines';
  fetch(url, {method: 'get'})
  .then((response) => response.json())

  .then(function(wine_list) {
      var random_wine = wine_list[Math.floor(Math.random() * wine_list.length)];

      var random_wine_body = '<p>' + random_wine_body['country'] + ',' +
                                     random_wine_body['description'] + ',' +
                                     random_wine_body['designation'] + ',' +
                                     random_wine_body['points'] + ',' +
                                     random_wine_body['price'] + ',' +
                                     random_wine_body['province'] + ',' +
                                     random_wine_body['taster_name'] + ',' +
                                     random_wine_body['taster_twitter_handle'] + ',' +
                                     random_wine_body['title'] + ',' +
                                     random_wine_body['variety'] + ',' +
                                     random_wine_body['winery'] + '</p>';
      }

      var wine_of_the_day = document.getElementById('wine_of_the_day');
      if (wine_of_the_day) {
          wine_of_the_day.innerHTML = random_wine_body;
      }

      .catch(function(error) {
          console.log(error);
      });
}



function getBaseURL() {
    var baseURL = window.location.protocol + '//' + window.location.hostname + ':' + api_port;
    return baseURL;
}

function onWinesSearch() {
    var url = getBaseURL() + '/wines';

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
        for (var k = 0; k < authorsList.length; k++) {
            tableBody += '<tr>';

            tableBody += '<td><a onclick="getAuthor(' + authorsList[k]['id'] + ",'"
                            + authorsList[k]['first_name'] + ' ' + authorsList[k]['last_name'] + "')\">"
                            + authorsList[k]['last_name'] + ', '
                            + authorsList[k]['first_name'] + '</a></td>';

            tableBody += '<td>' + authorsList[k]['birth_year'] + '-';
            if (authorsList[k]['death_year'] != 0) {
                tableBody += authorsList[k]['death_year'];
            }
            tableBody += '</td>';
            tableBody += '</tr>';
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

function getAuthor(authorID, authorName) {
    // Very similar pattern to onAuthorsButtonClicked, so I'm not
    // repeating those comments here. Read through this code
    // and see if it makes sense to you.
    var url = getBaseURL() + '/books/author/' + authorID;

    fetch(url, {method: 'get'})

    .then((response) => response.json())

    .then(function(booksList) {
        var tableBody = '<tr><th>' + authorName + '</th></tr>';
        for (var k = 0; k < booksList.length; k++) {
            tableBody += '<tr>';
            tableBody += '<td>' + booksList[k]['title'] + '</td>';
            tableBody += '<td>' + booksList[k]['publication_year'] + '</td>';
            tableBody += '</tr>';
        }
        var resultsTableElement = document.getElementById('results_table');
        if (resultsTableElement) {
            resultsTableElement.innerHTML = tableBody;
        }
    })

    .catch(function(error) {
        console.log(error);
    });
}
