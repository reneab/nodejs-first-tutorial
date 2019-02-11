// based on: https://www.w3schools.com/nodejs/nodejs_filesystem.asp//

const http = require('http');
const urlM = require('url');
const fs = require('fs');
const uc = require('upper-case');

const hostname = '127.0.0.1';
const port = 3000;

// create simple HTML file
const htmlToServe = 'demo.html';
fs.writeFile(htmlToServe, '<h1>Hello from NodeJS!</h1>', function (err) {
    if (err) throw err;
    console.log('Successfully created and saved ' + htmlToServe);
  });

const server = http.createServer(function(req, res) {

    // read existing file
    fs.readFile(htmlToServe, function(err, data) {
        console.log('Received request: ' + req.url);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');

        // server the HTML
        res.write(data);

        // parsing request
        const u = urlM.parse(req.url, true);
        console.log(u.host); // ex: localhost:3000
        console.log(u.pathname); // ex: /login
        console.log(u.search); // returns the search parameters. Ex: ?user=john
        console.log(u.query); // returns an object. Ex: {user: john}
        console.log('======================================')
        // serve other greeting message
        res.write('Successfully logged in ');
        if (u.query.user) {
            res.write('with username ' + uc(u.query.user));
        }
        if (u.query.id) {
            res.write(' and with ID ' + uc(u.query.id));
        }

        res.end();
    });
});

// launching server
server.listen(port, hostname, function() {
    console.log('Server running at http://'+ hostname + ':' + port + '/');
});