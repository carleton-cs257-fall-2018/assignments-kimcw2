/*
random-script.js
Yasmeen Awad and Chris Padilla
*/


function getBaseAPIURL() {
    var baseURL = window.location.protocol + '//' + window.location.hostname + ':' + api_port;
    return baseURL;
}

function getBaseWebURL() {
  var baseURL = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
  return baseURL;
}

//Initialize home page button
function go_to_home_page() {
  document.location.href = getBaseWebURL();
}
