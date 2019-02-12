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

// lauch server
app.listen(3000, 'localhost', () => {
    console.log('Listening on port 3000...');
})