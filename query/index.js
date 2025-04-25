const express =  require('express');
// To parse the bod of requests
const bodyParser = require('body-parser');
// To prevent cors errors
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {

})

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    if (type === 'PostCreated') {

    }

    if (type === 'CommentCreated') {

    }
})

app.listen(4002, () => {
    console.log('Listening on port 4002');
})

