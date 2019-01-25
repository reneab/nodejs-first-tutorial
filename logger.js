// based on: https://www.w3schools.com/nodejs/nodejs_filesystem.asp//

const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const logFile = 'log.txt';

// server that logs the requests in to a logFile
const server = http.createServer(function(req, res) {
    const toWrite = 'Received request: ' + req.url;
    console.log(toWrite);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    fs.appendFile(logFile, toWrite  + '\n', function(err) {
        if (err) throw err;
        console.log('Request saved successfully to ' + logFile);
    });

    res.write('<h1>Thank you from NodeJS!</h1>');
    res.end();
});

server.listen(port, hostname, function() {
    console.log('Server running at http://'+ hostname + ':' + port + '/');
});