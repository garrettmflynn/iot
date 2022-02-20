  var tessel = require('tessel');
  var http = require('http');
  var wsServer = require('./ws');
  const settings = require("./settings.js")

  // Node.js
  var fs = require('fs');
  var url = require('url');

    // const Neopixels = require('neopixels')
    // const neopixels = new Neopixels();

  var server = http.createServer(function (request, response) {
    // Break up the url into easier-to-use parts
    var urlParts = url.parse(request.url, true);

    // Create a regular expression to match requests to toggle LEDs
    var ledRegex = /leds/;

    if (urlParts.pathname.match(ledRegex)) {
      // If there is a request containing the string 'leds' call a function, toggleLED
      toggleLED(urlParts.pathname, request, response);
    } else {
      // All other request will call a function, showIndex
      showIndex(urlParts.pathname, request, response);
    }
  });


  // Add Websocket Server
  const wss = new wsServer(server)

    // Starting Server
  server.listen(settings.websocket.port);
  console.log(`Server running at http://${settings.websocket.endpoint}:${settings.websocket.port}/`);

  // Respond to the request with our index.html page
  function showIndex (url, request, response) {
    // Create a response header telling the browser to expect html
    response.writeHead(200, {"Content-Type": "text/html"});

    // Use fs to read in index.html
    fs.readFile(__dirname + '/public/index.html', function (err, content) {
      // If there was an error, throw to stop code execution
      if (err) {
        throw err;
      }

      // Serve the content of index.html read in by fs.readFile
      response.end(content);
    });
  }

  // Toggle the led specified in the url and respond with its state
  function toggleLED (url, request, response) {
    // Create a regular expression to find the number at the end of the url
    var indexRegex = /(\d)$/;

    // Capture the number, returns an array
    var result = indexRegex.exec(url);

    // Grab the captured result from the array
    var index = result[1];

    // Use the index to refence the correct LED
    var led = tessel.led[index];

    // Toggle the state of the led and call the callback after that's done
    led.toggle(function (err) {
      if (err) {
        // Log the error, send back a 500 (internal server error) response to the client
        console.log(err);
        response.writeHead(500, {"Content-Type": "application/json"});
        response.end(JSON.stringify({error: err}));
      } else {
        // The led was successfully toggled, respond with the state of the toggled led using led.isOn
        response.writeHead(200, {"Content-Type": "application/json"});
        response.end(JSON.stringify({on: led.isOn}));
      }
    });
  }