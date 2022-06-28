import express from 'express';
import cors from 'cors';
import path from 'path';
import axios from 'axios';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

import searchRouter from './routes/search.js';


if (process.env.NODE_ENV === 'production') {
    server.use(express.static('frontend/build'));
    server.get('*', (req, res) => {
        req.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'));
    });
} else {
	server.use('/search', searchRouter);
	// server.get('/search', function(req, res, next) {
	// 	res.json('respond with a resource');
	// });
    server.get('*', (req, res) => {
        res.json('hello');
    });
}

server.post('/api/search/stack-overflow', (req, res) => {
    const searchText = req.body.searchText;
    console.log(searchText);
    const team = 'stackoverflow.com/c/enterprise-at-box';
    const key = process.env.STACK_OVERFLOW_KEY;
    const accessToken = process.env.STACK_OVERFLOW_ACCESS_TOKEN;
    const url = `https://api.stackexchange.com/2.3/search/excerpts?order=desc&sort=activity&title=${searchText}&site=stackoverflow&key=${key}&team=${team}`;
    const config = {
        headers: {
            'X-API-Access-Token': accessToken
        }
    };
    axios.get(url, config).then((response) => {
        const data = response.data;
        data.items.forEach(item => {
            if (item.item_type === 'question') {
                const qid = item.question_id;
                item.link = `https://stackoverflow.com/c/enterprise-at-box/questions/${qid}`;
            }
        });
        res.json(data);
    });
});

const port = process.env.PORT || 5000;

server.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Express server listening at http://localhost:${port}`);
});

