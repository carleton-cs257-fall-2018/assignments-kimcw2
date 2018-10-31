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
    wine_of_the_day();
    getBaseWebURL();
    //var random_wine = document.getElementById('wine_of_the_day_button');
    //console.log("initialized the random_wine var");
    //if (random_wine) {
//	console.log("random wine clicked");
 //       random_wine.onclick = wine_of_the_day;
    //}
}

function wine_of_the_day() {
  var url = getBaseURL() + '/wines';
  fetch(url, {method: 'get'})
  .then((response) => response.json())

  .then(function(wine_list) {
      var random_wine = wine_list[Math.floor(Math.random() * wine_list.length)];
      console.log(random_wine);
      var random_wine_body = '<header name="wine_of_the_day" class="wine_of_the_day">Discover Wine</header>'+
                             '<div class="left_box"><p class = "title">' + random_wine['title'] +
                             '</p><p class = "variety"> Variety: ' + random_wine['variety'] +
                             '</p><text class = "winery"> Winery: ' + random_wine['winery'] +
                             '</text><text class = "place"> (' + random_wine['region'] +', '+ random_wine['province'] + ', ' + random_wine['country'] +
                             ')</text><p class = "points"> Points: ' + random_wine['points'] + '/100</p></div>'+
                             '<div class="middle_box"><p class = "description">Review: ' + random_wine['description'] +
                             '</p><text class = "taster_name">' + random_wine['taster_name'] +
                             '</text>  <text class = "taster_twitter_handle">(' + random_wine['taster_twitter_handle'] +
                             ')</text></div>' +
                             '<div class = "right_box">  <text class = "price">$' + random_wine['price'] +
                             '</text></div></div>';


      var wine_of_the_day = document.getElementById('wine_of_the_day');
      if (wine_of_the_day) {
          wine_of_the_day.innerHTML = random_wine_body;
      }})

      .catch(function(error) {
          console.log(error);
      });
}



function getBaseURL() {
    var baseURL = window.location.protocol + '//' + window.location.hostname + ':' + api_port;
    return baseURL;
}

function getBaseWebURL() {
    var baseWebURL = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
    console.log(baseWebURL);
    return baseWebURL;
}


function get_input() {
    var search_input = document.getElementById("search_bar").value;
    window.sessionStorage.setItem("search_input", search_input);
    return search_input
}
document.getElementById('submit_search').onclick = get_input();


//Initialize submit button to point to new page
function submit_search() {
  var url = getBaseWebURL() + '/submit_search';
  document.location.href = url;
}
document.getElementById('submit_search').onclick = submit_search;
