const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;

    axios.post('http://localhost:4000/events', event).catch(e => console.log(e.message));
    axios.post('http://localhost:4001/events', event).catch(e => console.log(e.message));

    res.send({status: 'OK'});
})

app.listen(4005, () => {
    console.log('Listening on 4005');
});
