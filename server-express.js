// A simple server responding to several types of GET requests
const express = require('express');
const app = express();

// default route
app.get('/', (req, res) => {
    console.log('Received request: ' + req.url);
    console.log('---------------------------------------------');
    res.send('Hello from Express!');
});

// greeting route with url paramater
app.get('/hi/:id', (req, res) => {
    console.log('Received request: ' + req.url);
    console.log(req.params);
    console.log('---------------------------------------------');
    res.send('Hello from Express, ' + req.params.id);
});

// login route with query parameters
app.get('/login', (req, res) => {
    console.log('Received request: ' + req.url);
    console.log(req.query);
    if (req.query.user) {
        res.send('User ' + req.query.user + ' successfully logged in');
    } else {
        res.send('Please specify parameter "user"');
    }
    console.log('---------------------------------------------');
});

// get the port from the environment if any
const port = process.env.PORT || 3000;

// lauch server
app.listen(port, 'localhost', () => {
    console.log('Listening on port ' + port + '...');
});