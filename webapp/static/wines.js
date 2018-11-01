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
// The contents of getBaseApiURL below reflects our assumption that
// the web application (books_website.py) and the API (books_api.py)
// will be running on the same host but on different ports.
//
// But if you take a look at the contents of getBaseApiURL, you may
// ask: where does the value of api_port come from? The answer is
// a little bit convoluted. (1) The command-line syntax of
// books_website.py includes an argument for the API port;
// and (2) the index.html Flask/Jinja2 template includes a tiny
// bit of Javascript that declares api_port and assigns that
// command-line API port argument to api_port. This happens
// before books.js is loaded, so the functions in books.js (like
// getBaseApiURL) can access api_port as needed.

initialize();

function initialize() {

  var home_button = document.getElementById('go_to_home_page');
  home_button.onclick = function() {
    go_to_home_page();
  }

  var discover_wine_button = document.getElementById('go_to_discover_wine');
  discover_wine_button.onclick = function() {
    go_to_discover_wine();
  }

  var about_button = document.getElementById('go_to_about_page');
  about_button.onclick = function () {
    go_to_about_page();
  }

  var advanced_search_button = document.getElementById('go_to_advanced_search_page')
  advanced_search_button.onclick = function() {
    go_to_advanced_search_page();
  }


  var search_button = document.getElementById('submit_search');
  search_button.onclick = function() {
    sessionStorage.setItem("search_text",document.getElementById("search_bar").value);
    sessionStorage.setItem("advanced_search", 1);
    go_to_display_page();
  }

  if (window.location.pathname.includes("/advanced_search")) {
    var advanced_search_submit_button = document.getElementById('advanced_search_submit_button');
    console.log("created advanced_search_submit_button var");
    advanced_search_submit_button.onclick = function() {
      console.log("advanced_search_submit_button was clicked");
      sessionStorage.setItem("varieties_search_text",document.getElementById("varieties_search_bar").value);
      sessionStorage.setItem("taster_search_text",document.getElementById("taster_search_bar").value);
      sessionStorage.setItem("region_search_text",document.getElementById("region_search_bar").value);
      sessionStorage.setItem("description_search_text",document.getElementById("description_search_bar").value);
      sessionStorage.setItem("vineyard_search_text",document.getElementById("vineyard_search_bar").value);
      sessionStorage.setItem("country_search_text",document.getElementById("country_search_bar").value);
      sessionStorage.setItem("title_search_text",document.getElementById("title_search_bar").value);
      sessionStorage.setItem("advanced_search", 0);
    }
  }

  if (window.location.pathname.includes("display")){
    console.log("in display page with: ");
    try {console.log(sessionStorage.getItem("search_text"));}
    catch(err) {
      console.log("sessionStorage search text empty");
    }
    console.log("as my search text");
    console.log(sessionStorage.getItem("advanced_search"));

    if (sessionStorage.getItem("advanced_search") == 1) {
      console.log("normal search");
      onWinesSearch("default", sessionStorage.getItem("search_text"));
    }
    else {
      console.log("advanced search");
      onAdvancedWinesSearch(sessionStorage.getItem("varieties_search_text"),
                            sessionStorage.getItem("taster_search_text"),
                            sessionStorage.getItem("region_search_text"),
                            sessionStorage.getItem("description_search_text"),
                            sessionStorage.getItem("vineyard_search_text"),
                            sessionStorage.getItem("country_search_text"),
                            sessionStorage.getItem("title_search_text"),
                            );
    }
  } else if (window.location.pathname.includes("about")){
  } else if (window.location.pathname.includes("discover_wine")){
  } else {
    discover_wine();
  }
}

function go_to_home_page() {
  document.location.href = getBaseWebURL();
}

function go_to_discover_wine(){
  document.location.href = (getBaseWebURL() + "#discover_wine");
}

function go_to_about_page(){
  document.location.href = (getBaseWebURL() + "/about");
}

function go_to_display_page() {
  document.location.href = (getBaseWebURL() + "/display");
}

function go_to_advanced_search_page() {
  document.location.href = (getBaseWebURL() + "/advanced_search");
}

function discover_wine() {
  var url = getBaseApiURL() + '/wines';
  fetch(url)
  .then((response) => response.json())

  .then(function(wine_list) {
      var random_wine = wine_list[Math.floor(Math.random() * wine_list.length)];
      console.log(random_wine);
      var random_wine_body = '<header name="discover_wine" class="discover_wine">Discover Wine</header>'+
                             '<div class="left_box"><p class = "title">' + random_wine['title'] +
                             '</p><p class = "varieties"> varieties: ' + random_wine['varieties'] +
                             '</p><text class = "winery"> Winery: ' + random_wine['winery'] +
                             '</text><text class = "place"> (' + random_wine['region'] +', '+ random_wine['province'] + ', ' + random_wine['country'] +
                             ')</text><p class = "points"> Points: ' + random_wine['points'] + '/100</p></div>'+
                             '<div class="middle_box"><p class = "description">Review: ' + random_wine['description'] +
                             '</p><text class = "taster_name">' + random_wine['taster_name'] +
                             '</text>  <text class = "taster_twitter_handle">(' + random_wine['taster_twitter_handle'] +
                             ')</text></div>' +
                             '<div class = "right_box">  <text class = "price">$' + random_wine['price'] +
                             '</text></div></div>';


      var discover_wine = document.getElementById('discover_wine');
      if (discover_wine) {
          discover_wine.innerHTML = random_wine_body;
      }})

      .catch(function(error) {
          console.log(error);
      });
}

function getBaseApiURL() {
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
  var url = getBaseApiURL() + `/wines?${category}=${search_text}`;
  console.log(url);

  fetch(url)
    .then(response => response.json())
    .then(function(data) {
      console.log(data);
      var list = '';
      for (var k=0; k<data.length;k++) {
        list += '<li><div id="discover_wine" class="info_box">'+
                               '<div class="left_box"><p class = "title">' + data[k]['title'] +
                               '</p><p class = "varieties"> varieties: ' + data[k]['varieties'] +
                               '</p><text class = "winery"> Winery: ' + data[k]['winery'] +
                               '</text><text class = "place"> (' + data[k]['region'] +', '+ data[k]['province'] + ', ' + data[k]['country'] +
                               ')</text><p class = "points"> Points: ' + data[k]['points'] + '/100</p></div>'+
                               '<div class="middle_box"><p class = "description">Review: ' + data[k]['description'] +
                               '</p><text class = "taster_name">' + data[k]['taster_name'] +
                               '</text>  <text class = "taster_twitter_handle">(' + data[k]['taster_twitter_handle'] +
                               ')</text></div>' +
                               '<div class = "right_box">  <text class = "price">$' + data[k]['price'] +
                               '</text></div></div></div></li>';
        /*
        var title = data[k]['title'] || "undefined";
        var varieties = data[k]['varieties'] || "undefined";
        var winery = "Winery: " + data[k]['winery'] || "undefined";
        var points = data[k]['points'] + "/100" || "undefined";
        var description = data[k]['description'] || "undefined";
        var taster_name = "Taster: " + data[k]['taster_name'] || "undefined";
        var taster_twitter_handle = "twitter handle: " + data[k]['taster_twitter_handle'] || "undefined";
        var price = "$" + data[k]['price'] || "undefined";

        var main_li = document.createElement("li");
        main_li.setAttribute("wine_name",title);
        main_li.setAttribute("class","wine_view");
        var left_panel = document.createElement("div");
        left_panel.setAttribute("class","left_panel");
        var title_span = document.createElement("span");
        title_span.setAttribute("class","title");
        title_span.innerHTML = title;
        var varieties_span = document.createElement("span");
        varieties_span.setAttribute("class","varieties");
        varieties_span.innerHTML = varieties;
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
        append(left_panel,varieties_span);
        append(left_panel,winery_span);
        append(left_panel,points_span);
        append(mid_panel,description_span);
        append(mid_panel,taster_name_span);
        append(mid_panel,taster_twitter_span);
        append(right_panel,price_span);

        append(main_li, left_panel);
        append(main_li, mid_panel);
        append(main_li, right_panel);

        append(document.getElementById("search_wrap"), main_li);*/
      }

      var search_wrap = document.getElementById('search_wrap');
      if (search_wrap) {
          search_wrap.innerHTML = list;
      }
    })
    .catch(error => console.error(error));
}


function onAdvancedWinesSearch(varieties, taster, region, description, vineyard, country, title) {
  if (varieties.length == 0) {
    varieities = "%"
  }
  if (taster.length == 0) {
    taster = "%"
  }
  if (region.length == 0) {
    region = "%"
  }
  if (description.length == 0) {
    description = "%"
  }
  if (vineyard.length == 0) {
    varieites = "%"
  }
  if (country.length == 0) {
    country = "%"
  }
  if (title.length == 0) {
    title = "%"
  }
  var url = getBaseApiURL() + `/wines?varieties=${varieties}&taster=${taster}&region=${region}&description=${description}&vineyard=${vineyard}&country=${country}&title=${title}`;
  console.log(url);

  fetch(url)
    .then(response => response.json())
    .then(function(data) {
      console.log(data);
      var list = '';
      for (var k=0; k<data.length;k++) {
        list += '<li><div id="discover_wine" class="info_box">'+
                               '<div class="left_box"><p class = "title">' + data[k]['title'] +
                               '</p><p class = "varieties"> varieties: ' + data[k]['varieties'] +
                               '</p><text class = "winery"> Winery: ' + data[k]['winery'] +
                               '</text><text class = "place"> (' + data[k]['region'] +', '+ data[k]['province'] + ', ' + data[k]['country'] +
                               ')</text><p class = "points"> Points: ' + data[k]['points'] + '/100</p></div>'+
                               '<div class="middle_box"><p class = "description">Review: ' + data[k]['description'] +
                               '</p><text class = "taster_name">' + data[k]['taster_name'] +
                               '</text>  <text class = "taster_twitter_handle">(' + data[k]['taster_twitter_handle'] +
                               ')</text></div>' +
                               '<div class = "right_box">  <text class = "price">$' + data[k]['price'] +
                               '</text></div></div></div></li>';

      /*for (var k=0; k<data.length;k++) {
        var title = data[k]['title'] || "undefined";
        var varieties = data[k]['varieties'] || "undefined";
        var winery = "Winery: " + data[k]['winery'] || "undefined";
        var points = data[k]['points'] + "/100" || "undefined";
        var description = data[k]['description'] || "undefined";
        var taster_name = "Taster: " + data[k]['taster_name'] || "undefined";
        var taster_twitter_handle = "twitter handle: " + data[k]['taster_twitter_handle'] || "undefined";
        var price = "$" + data[k]['price'] || "undefined";

        var main_li = document.createElement("li");
        main_li.setAttribute("wine_name",title);
        main_li.setAttribute("class","wine_view");
        var left_panel = document.createElement("div");
        left_panel.setAttribute("class","left_panel");
        var title_span = document.createElement("span");
        title_span.setAttribute("class","title");
        title_span.innerHTML = title;
        var varieties_span = document.createElement("span");
        varieties_span.setAttribute("class","varieties");
        varieties_span.innerHTML = varieties;
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
        append(left_panel,varieties_span);
        append(left_panel,winery_span);
        append(left_panel,points_span);
        append(mid_panel,description_span);
        append(mid_panel,taster_name_span);
        append(mid_panel,taster_twitter_span);
        append(right_panel,price_span);

        append(main_li, left_panel);
        append(main_li, mid_panel);
        append(main_li, right_panel);

        append(document.getElementById("search_wrap"), main_li);*/
      }
      var search_wrap = document.getElementById('search_wrap');
      if (search_wrap) {
          search_wrap.innerHTML = list;
      }
    })
    .catch(error => console.error(error));
}
