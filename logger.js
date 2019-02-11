// based on: https://www.w3schools.com/nodejs/nodejs_filesystem.asp//

const http = require('http');
const fs = require('fs');
const events = require('events');

const eventEmitter = new events.EventEmitter();

const hostname = '127.0.0.1';
const port = 3000;

const logFile = 'log.txt';

// event listener on opening the log file
var rs = fs.createReadStream(logFile);
rs.on('open', function () {
  console.log('Oh! Someone has opened the log file!');
});

// simple event listener that performs a log
eventEmitter.on('request', function() {
    console.log('Request saved successfully to ' + logFile);
});

// server that logs the requests in to a logFile
const server = http.createServer(function(req, res) {
    const toWrite = 'Received request: ' + req.url;
    console.log(toWrite);
    
    fs.appendFile(logFile, toWrite  + '\n', function(err) {
        if (err) console.error('Could not write to log file');
        eventEmitter.emit('request');
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>Thank you from NodeJS!</h1>');
    res.end();
});

server.listen(port, hostname, function() {
    console.log('Server running at http://'+ hostname + ':' + port + '/');
});