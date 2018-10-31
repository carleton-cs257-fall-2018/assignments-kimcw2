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
    onWineSearchPart2();
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

function onWinesSearch() {

  //window.location.href = getBaseUrl() + "/wines?title=" + value;
  var defaultTo = True;
  var value = document.getElementById("search_bar").value;
  console.log(value);
  var searchDirectory;

  if (defaultTo) {searchDirectory = "/wines?title=" + value + "/";}
  else {}

  //location.href = getBaseURL() + "/view" + searchDirectory
  var url = getBaseURLWeb() + "test";
  window.location.href = url
}

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function onWineSearchPart2() {
  // Send the request to the Books API /authors/ endpoint
  var url = getBaseURL() + "/wines?title=" + "a";
  var wine_result_list = [];
  var jsonResult = fetch(url, {method: 'get'})
    .then((response) => response.json())
    .then(function(data) {
      for (var i=0; i<data.products.length; i++){
        var country = data.products[i].country;
        var description = data.products[i].description;
        var designation = data.products[i].designation;
        var points = data.products[i].points;
        var price = data.products[i].price;
        var province = data.products[i].province;
        var taster_name = data.products[i].taster_name;
        var taster_twitter_handle = data.products[i].taster_twitter_handle;
        var title = data.products[i].title;
        var variety = data.products[i].variety;
        var winery = data.products[i].winery;

        var main_wrapper_format = "<li wine_name=${title} class=wine_view>"+
          "<div class=left_panel><span class=title>${title}</span><span class=variety>${variety}</span><span class=winery>${winery}</span><span class=points>${points}</span></div>"+
          "<div class=mid_panel><span class=description>${description}</span><span class=taster_name>${taster_name}</span><span class=taster_twitter_handle>${taster_twitter_handle}</span></div>"+
          "<div class=right_panel><span class=price>${price}</span></div>"+"</li>";

        wine_result_list.push(main_wrapper_format);
      }
    });



  //for (wine in result) {
  //  country = wine['country'];
  //  description = wine['description'];
  //  designation = wine['designation'];
  //  points = wine['points'];
  //  price = wine['price'];
  //  province = wine['province'];
  //  taster_name = wine['taster_name'];
  //  taster_twitter_handle = wine['taster_twitter_handle'];
  //  title = wine['title'];
  //  variety = wine['variety'];
  //  winery = wine['winery'];

  //  var main_wrapper_format = "<li wine_name=${title} class=wine_view>"+
  //    "<div class=left_panel><span class=title>${title}</span><span class=variety>${variety}</span><span class=winery>${winery}</span><span class=points>${points}</span></div>"+
  //    "<div class=mid_panel><span class=description>${description}</span><span class=taster_name>${taster_name}</span><span class=taster_twitter_handle>${taster_twitter_handle}</span></div>"+
  //    "<div class=right_panel><span class=price>${price}</span></div>"+"</li>";
  //}

  console.log(wine_result_list.length);
  console.log(wine_result_list);

  var search_wrap = document.getElementById("search_wrap");

  if (search_wrap) {
    for (result in wine_result_list) {
      search_wrap += result;
    }
  }
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
