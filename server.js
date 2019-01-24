// based on: https://www.w3schools.com/nodejs/nodejs_filesystem.asp//

const http = require('http');
const urlM = require('url');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(function(req, res) {

    fs.readFile('demo.html', function(err, data) {
        console.log('Received request: ' + req.url);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        // res.write('Coucou! Welcome to NodeJS \n');

        const u = urlM.parse(req.url, true);
        console.log(u.pathname);
        // console.log(u.search);
        console.log(u.query);
        
        res.write(data);
        res.write('Hi ' + u.query.user + '! Your ID today is ' + u.query.id)
        res.end();
    });
});

server.listen(port, hostname, function() {
    console.log('Server running at http://'+ hostname + ':' + port + '/');
});