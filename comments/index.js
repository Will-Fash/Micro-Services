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

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    // random is like heyr66e7wbd8wb
    const commentId =  randomBytes(4).toString('hex');
    const { content } = req.body;

    // get an array of comments with the same post id if it exists in the object
    const comments = commentsByPostId[req.params.id] || [];
    
    comments.push({id: commentId, content});

    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events', {
        type: 'commentCreated',
        data: {
            id: commentId, content, postId: req.params.id
        }
    }).catch(e => {console.log(e.message)});

    res.status(201).send(comments);
});

// To capture events from the event-bus
app.post('/events', (req, res) => {
    console.log('Received Event', req.body.type);
    res.sendStatus(201);
})

app.listen(4001, () => {
    console.log('Listening on 4001');
});