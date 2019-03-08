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

const names = [
    {id: 1, name: 'John'},
    {id: 2, name: 'Johanna'} 
];

app.get('/name/:id', (req, res) => {
    console.log('Received request: ' + req.url);
    console.log(req.params);
    console.log('---------------------------------------------');
    const entry = names.find(c => c.id == parseInt(req.params.id));
    // send 404 if not found
    if (!entry) res.status(404).send('ID not found in database')
    else res.send(entry.name);
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