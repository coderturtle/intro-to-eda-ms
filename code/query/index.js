const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
//Quick Example
//posts === {
//    'j123u67': {
//        id: 'j863t67',
//        title: 'example post',
//        comments: [
//            { id: 'k89y6', content: 'sample comment'}
//        ]
//
//    },
//
//}

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', async (req, res) => {
    const {type, data } = req.body;

    if (type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] };
    }

    if (type === 'CommentCreated') {
        const {id, content, postId } = data;

        const post = posts[postId];
        post.comments.push({ id, content });
    }

    console.log(posts);

    res.send({});
});

app.listen(4002, () => {
    console.log('Listening on 4002');
});
