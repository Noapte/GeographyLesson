// Set up: npm install
var http = require("http"),
    fs = require("fs"),
    path = require("path"),
    ws = require("ws"),
    open = require("open");
// HTTP server
var countriesData;
fs = require('fs')
fs.readFile('countries.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  countriesData = data;
});
var server = http.createServer(function(req, res) {
    var file = null,
        type = "text/html";
    if (req.url == "/") {
        file = "index.html";
    } else if (/^\/(\w+(?:\.min)?\.(?:js|html|proto))$/.test(req.url)) {
        file = req.url.substring(1);
        if (/\.js$/.test(file)) {
            type = "text/javascript";
        }
    }
    if (file) {
        fs.readFile(path.join(__dirname, "www", file), function(err, data) {
            if (err) {
                res.writeHead(500, {
                    "Content-Type": type
                });
                res.end("Internal Server Error: " + err);
            } else {
                res.writeHead(200, {
                    "Content-Type": type
                });
                res.write(data);
                res.end();
                console.log("Served www/" + file);
            }
        });
    } else {
        res.writeHead(404, {
            "Content-Type": "text/html"
        });
        res.end("Not Found");
    }
});
server.listen(8080);
server.on("listening", function() {
    console.log("Server started");
    open("http://localhost:8080/");
});
server.on("error", function(err) {
    console.log("Failed to start server:", err);
    process.exit(1);
});
// WebSocket adapter
var wss = new ws.Server({
    server: server
});
wss.on("connection", function(socket) {
    console.log("New WebSocket connection");
    socket.on("close", function() {
        console.log("WebSocket disconnected");
    });
    socket.on("message", function(data, flags) {
        try {
            var msg = data;
            console.log("Received: " + msg);
            msg = msg.toUpperCase();
            socket.send(countriesData);
            console.log("Sent: " + msg);
        } catch (err) {
            console.log("Processing failed:", err);
        }
    });
});