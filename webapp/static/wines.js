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
  if (!(window.location.pathname.includes("display"))){
    var search_button = document.getElementById('submit_search');
    search_button.onclick = function() {
      sessionStorage.setItem("search_text",document.getElementById("search_bar").value);
      console.log(sessionStorage.getItem("search_text"));
    }
    wine_of_the_day();
  } else {
    onWinesSearch("default", sessionStorage.getItem("search_text"));
  }
}

function wine_of_the_day() {
  var url = getBaseURL() + '/wines';
  fetch(url)
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

function append(parent, el) {
  return parent.appendChild(el);
}

function onWinesSearch(category, search_text) {
  // TODO change here to account for different search categories
  if (category == "default") {category = "title"}
  var url = getBaseURL() + `/wines?${category}=${search_text}`;
  console.log(url);

  fetch(url)
    .then(response => response.json())
    .then(function(data) {
      console.log(data);
      for (var k=0; k<data.length;k++) {
        var title = data[k]['title'] || "undefined";
        var variety = data[k]['variety'] || "undefined";
        var winery = data[k]['winery'] || "undefined";
        var points = data[k]['points'] || "undefined";
        var description = data[k]['description'] || "undefined";
        var taster_name = data[k]['taster_name'] || "undefined";
        var taster_twitter_handle = data[k]['taster_twitter_handle'] || "undefined";
        var price = data[k]['price'] || "undefined";

        var main_li = document.createElement("li");
        main_li.setAttribute("wine_name",title);
        main_li.setAttribute("class","wine_view");
        var left_panel = document.createElement("div");
        left_panel.setAttribute("class","left_panel");
        var title_span = document.createElement("span");
        title_span.setAttribute("class","title");
        title_span.innerHTML = title;
        var variety_span = document.createElement("span");
        variety_span.setAttribute("class","variety");
        variety_span.innerHTML = variety;
        var winery_span = document.createElement("span");
        winery_span.setAttribute("class","winery");
        winery_span.innerHTML = winery;
        var points_span = document.createElement("span");
        points_span.setAttribute("class","points");
        points_span.innerHTML = points;
        var mid_panel = document.createElement("div");
        mid_panel.setAttribute("class","mid_panel");
        var description_span = document.createElement("span");
        description_span.setAttribute("class","description");
        description_span.innerHTML = description;
        var taster_name_span = document.createElement("span");
        taster_name_span.setAttribute("class","taster_name");
        taster_name_span.innerHTML = taster_name;
        var taster_twitter_span = document.createElement("span");
        taster_twitter_span.setAttribute("class","taster_twitter_handle");
        taster_twitter_span.innerHTML = taster_twitter_handle;
        var right_panel = document.createElement("div");
        right_panel.setAttribute("class","right_panel");
        var price_span = document.createElement("span");
        price_span.setAttribute("class","price");
        price_span.innerHTML = price;

        append(left_panel,title_span);
        append(left_panel,variety_span);
        append(left_panel,winery_span);
        append(left_panel,points_span);
        append(mid_panel,description_span);
        append(mid_panel,taster_name_span);
        append(mid_panel,taster_twitter_span);
        append(right_panel,price_span);

        append(main_li, left_panel);
        append(main_li, mid_panel);
        append(main_li, right_panel);

        append(document.getElementById("search_wrap"), main_li);
      }
    })
    .catch(error => console.error(error))
}
