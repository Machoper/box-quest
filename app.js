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
    server.get('*', (req, res) => {
        res.json('hello');
    });
}

server.use('/api/search', searchRouter);

const port = process.env.PORT || 5000;

server.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Express server listening at http://localhost:${port}`);
});

