// based on: https://www.w3schools.com/nodejs/nodejs_filesystem.asp//

const http = require('http');
const urlM = require('url');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

var html;
fs.readFile('src/index.html', function(err, data) {
    if (err) console.error('Cannot read HTML file');
    html = data; 
});

var css;
fs.readFile('src/style.css', function(err, data) {
    if (err) console.error('Cannot read CSS file');
    css = data; 
});


const server = http.createServer(function(req, res) {
    console.log('Received request: ' + req.url);

    switch (req.url) {
        case '/':
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.write(html);
            break;

        case '/index.html':
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.write(html);
            break;

        case '/style.css':
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/css');
            res.write(css);
            break;
            
        default:
            console.error('Don\'t know what you\'re talking about...');
            res.statusCode = 404;
    }

    res.end();
});

// launching server
server.listen(port, hostname, function() {
    console.log('Server running at http://'+ hostname + ':' + port + '/');
});