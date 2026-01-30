
// import the http module
const http = require("http");

// create a server object
const server = http.createServer(function (req, res) {
    // write a response to the client
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Welcome to the Node.js tutorial");
});

// Listen on port 3000
server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});


  