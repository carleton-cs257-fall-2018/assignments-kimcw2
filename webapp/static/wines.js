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
  initMap();
  
  var search_button = document.getElementById('submit_search');
  search_button.onclick = function() {
    sessionStorage.setItem("search_text",document.getElementById("search_bar").value);
  }
  var home_button = document.getElementById('go_to_home_page');
  home_button.onclick = function() {
    go_to_home_page();
  }

  var discover_wine_button = document.getElementById('go_to_discover_wine');
  discover_wine_button.onclick = function() {
    go_to_discover_wine();
  }
    
  if (window.location.pathname.includes("display")){
    onWinesSearch("default", sessionStorage.getItem("search_text"));
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

function discover_wine() {
  var url = getBaseURL() + '/wines';
  fetch(url)
  .then((response) => response.json())

  .then(function(wine_list) {
      var random_wine = wine_list[Math.floor(Math.random() * wine_list.length)];
      console.log(random_wine);
      var random_wine_body = '<header name="discover_wine" class="discover_wine">Discover Wine</header>'+
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


      var discover_wine = document.getElementById('discover_wine');
      if (discover_wine) {
          discover_wine.innerHTML = random_wine_body;
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
    .catch(error => console.error(error));
}

function initMap() {
  var  italy = [{lat: 41.871941, lng:12.567380}, "Italy", 24382];
  var  portugal= [{lat: 39.399872, lng:-8.224454}, "Portugal", 5696];
  var  us= [{lat: 37.090240, lng:-95.712891}, "United States", 54512];
  var  spain= [{lat: 40.463669, lng:-3.749220}, "Spain", 6770];
  var  france= [{lat: 46.227638, lng:2.213749}, "France", 22830];
  var  germany= [{lat: 51.165691, lng:10.451526}, "Germany", 2177];
  var  argentina= [{lat: -38.416096, lng:-63.616673}, "Argentina", 3836];
  var  chile= [{lat: -35.675148, lng:-71.542969}, "Chile", 4623];
  var  australia= [{lat: -25.274399, lng:133.775131}, "Australia", 2607];
  var  austria= [{lat: 47.516232, lng:14.550072}, "Austria", ];
  var  southafrica= [{lat: -30.559483, lng:22.937506}, "South Africa", 1406];
  var  newzealand= [{lat: -40.900558, lng:174.885971}, "New Zealand", 1431];
  var  israel= [{lat: 31.046051, lng:34.851612}, "Israel", 522];
  var  hungary= [{lat: 47.162495, lng:19.503304}, "Hungary", 153];
  var  greece= [{lat: 39.074207, lng:21.824312}, "Greece", 479];
  var  romania= [{lat: 45.943161, lng:24.966761}, "Romania", 141];
  var  mexico= [{lat: 23.634501, lng:-102.552788}, "Mexico", 70];
  var  canada= [{lat: 56.130367, lng:-106.346771}, "Canada", 259];
  var  georgia= [{lat: -20.422290, lng:-54.641280}, "Georgia", 100];
  var  turkey= [{lat: 38.963745, lng:35.243320}, "Turkey", 107];
  var  czechrepublic= [{lat: 49.817493, lng:15.472962}, "Czech Republic", 12];
  var  slovenia= [{lat: 46.151241, lng: 14.995463}, "Slovenia", 93];
  var  luxembourg= [{lat: 49.815273, lng:6.129583}, "Luxembourg", 6];
  var  croatia= [{lat: 45.099998, lng:15.200000}, "Croatia", 74];
  var  uruguay= [{lat: -32.522778, lng:-55.765835}, "Uruguay", 133];
  var  england= [{lat: 52.355518, lng:-1.174320}, "England", 148];
  var  lebanon= [{lat: 33.908956, lng:35.817637}, "Lebanon", 48];
  var  serbia= [{lat: 44.016521, lng:21.005859}, "Serbia", 12];
  var  brazil= [{lat: -14.235004, lng:-51.925282}, "Brazil", 59];
  var  moldova= [{lat: 47.411633, lng:28.369884}, "Moldova", 113];
  var  morocco= [{lat: 31.791702, lng:-7.092620}, "Morocco", 34];
  var  peru= [{lat: -9.189967, lng:-75.015152}, "Peru", 16];
  var  india= [{lat: 20.593683, lng:78.962883}, "India", 10];
  var  bulgaria= [{lat: 42.696490, lng:23.326010}, "Bulgaria", 150];
  var  cyprus= [{lat: 35.126411, lng:33.429859}, "Cyprus", 14];
  var  armenia= [{lat: 40.069099, lng:45.038189}, "Armenia", 4];
  var  switzerland= [{lat: 46.818188, lng:8.227512}, "Switzerland", 11];
  var  bosniaandherzegovina= [{lat: 43.915886, lng:17.679075}, "Bosnia and Herzegovina", 2];
  var  ukraine= [{lat: 48.379433, lng:31.165581}, "Ukraine", 2];
  var  slovakia= [{lat: 48.669025, lng:19.699024}, "Slovakia", 1];
  var  macedonia= [{lat: 41.608635, lng:21.745275}, "Macedonia", 23];
  var  china= [{lat: 35.861660, lng:104.195396}, "China", 2];
  var  egypt= [{lat: 26.820553, lng:30.802498}, "Egypt", 2];

  var countries = [italy,portugal,us,spain,france,germany,argentina,chile,australia,austria,southafrica,
          newzealand,israel,hungary,greece,romania,mexico,canada,georgia,turkey,czechrepublic,
          slovenia,luxembourg,croatia,uruguay,england,lebanon,serbia,brazil,moldova,morocco,peru,
          india,bulgaria,cyprus,armenia,switzerland,bosniaandherzegovina,ukraine,slovakia,macedonia,
          china,egypt]
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: italy[0]});

  var image = {
      url: '../static/images/marker.png',
      // This marker is 20 pixels wide by 32 pixels high.
      scaledSize: new google.maps.Size(20, 32),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the wineglass at (10, 32).
      anchor: new google.maps.Point(10, 32)};


  var cl = countries.length;
  for (var i = 0; i < cl; i++){
      var marker = new google.maps.Marker({position: countries[i][0], map: map, icon: image, draggable: true, animation: google.maps.Animation.DROP, title: countries[i][1]});

      var content = '<p><strong>'+countries[i][1]+'</strong> has '+countries[i][2]+' wines registered in our database!</p><br>'+'<a href="https://en.wikipedia.org/wiki/'+countries[i][1]+'" target="_blank">Learn more about this country</a>';

      attachInfoToMarker(marker,content);

  }
}

function attachInfoToMarker(marker, infowindowcontent){
    var infowindow = new google.maps.InfoWindow({
        content: infowindowcontent});

    marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
}
