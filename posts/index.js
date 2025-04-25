const express =  require('express');
// To parse the bod of requests
const bodyParser = require('body-parser');
// To assign a random ID to the posts a user is trying to create
const {randomBytes} = require('crypto');
// To prevent cors errors
const cors = require('cors');
const axios = require('axios');

const app =  express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', async (req, res) => {
    // random is like heyr66e7wbd8wb
    const id =  randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id, title
    };

    await axios.post('http://localhost:4005/events', {
        type: 'postCreated',
        data: {
            id, title
        }
    }).catch(e => {console.log(e.message)});

    res.status(201).send(posts[id]);
});

// To capture events from the event-bus
app.post('/events', (req, res) => {
    console.log('Received Event', req.body.type);
    res.sendStatus(201);
})

app.listen(4000, () => {
    console.log('Listening on 4000');
});