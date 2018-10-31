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

function append(parent, el) {
  return parent.appendChild(el);
}

function onWinesSearch(search_input) {
  console.log(search_input);
  var url = getBaseURL() + "/wines?title=" + search_input;
  console.log(url);
  var list_li = [];

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

function get_input() {
    var search_input = document.getElementById("search_bar").value;
    window.sessionStorage.setItem("search_input", search_input);
    return search_input
}
document.getElementById('submit_search').onclick = get_input();

document.getElementById('submit_search').onclick = onWinesSearch(window.sessionStorage.getItem("search_input"));
