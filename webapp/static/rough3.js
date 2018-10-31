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
  if (window.location.href == getBaseURLWeb()){
    var search_button = document.getElementById('submit_search');
    search_button.onclick = function() {onWineSearch("default", document.getElementById('search_bar').value);}
    wine_of_the_day();
  } else {
    onWineSearch(category, search_text);
  }
}

function wine_of_the_day() {
  var url = getBaseURL() + '/wines';
  fetch(url, {method: 'get'})
  .then((response) => response.json())

  .then(function(wine_list) {
      var random_wine = wine_list[Math.floor(Math.random() * wine_list.length)];
      console.log(random_wine);
      var random_wine_body = '<p>' + random_wine['country'] + ',' +
                                     random_wine['description'] + ',' +
                                     random_wine['designation'] + ',' +
                                     random_wine['points'] + ',' +
                                     random_wine['price'] + ',' +
                                     random_wine['province'] + ',' +
                                     random_wine['taster_name'] + ',' +
                                     random_wine['taster_twitter_handle'] + ',' +
                                     random_wine['title'] + ',' +
                                     random_wine['variety'] + ',' +
                                     random_wine['winery'] + '</p>';


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

function getBaseURLWeb() {
  var api_port_str = api_port.toString();
  var web_port;
  if (api_port_str.substring(1,2) == '1'){
    web_port = api_port_str.substring(0,1) + '2' + api_port_str.substring(2);
  } else {
    web_port = api_port_str.substring(0,1) + '1' + api_port_str.substring(2);
  }
  var baseURL = window.location.protocol + '//' + window.location.hostname + ':' + web_port;
  return baseURL;
}

function onWinesSearch(category, search_text) {
  var defaultTo = True;
  var searchDirectory;

  if (defaultTo) {searchDirectory = "/wines?title=" + search_text + "/";}
  else {}

  onWineSearchPart2(category, search_text);

  //location.href = getBaseURL() + "/view" + searchDirectory
  //var url = getBaseURLWeb() + "/display";
  //window.location.href = url
}

function append(parent, el) {
  return parent.appendChild(el);
}

function onWineSearchPart2(category, search_text) {
  // Send the request to the Books API /authors/ endpoint
  if (category == "default") {category = "description"}
  var url = getBaseURL() + "/wines?${category}=${search_text}";
  console.log(url);
  var list_li = [];

  fetch(url)
    .then(response => response.json())
    .then(function(data) {
      //var tableBody = document.createElement("ul");
      //for (var k = 0; k < wineList.length; k++) {
      //    tableBody += '<tr>';
      //    tableBody += '<td>' + booksList[k]['title'] + '</td>';
      //    tableBody += '<td>' + booksList[k]['publication_year'] + '</td>';
      //    tableBody += '</tr>';
      //}
      //var resultsTableElement = document.getElementById('results_table');
      //if (resultsTableElement) {
      //    resultsTableElement.innerHTML = tableBody;
      //}
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

        //list_li.push(main_li);
      }
    })
    .catch(error => console.error(error))

  //console.log(list_li);

  //console.log(wine_result_list.length);
  //console.log(wine_result_list);
}
