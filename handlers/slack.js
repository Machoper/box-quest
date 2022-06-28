import express from 'express';
import app from '@slack/web-api';
import {WebClient, LogLevel} from '@slack/web-api';
var router = express.Router();

const client = new WebClient("xoxb-3728658353141-3731536397859-S8V2qaYw2ct7phFjPUGmaMeo", {logLevel: LogLevel.DEBUG,});

const slackSearchHandler = () => {
	const slackRes = []
    server.post('/api/search/slack', (req, res) => {
        const text = req.body.searchText;
        console.log(text);
      
        async function findQuery(q) {
          try {
            // Call the search.messages using the built-in WebClient
            const result = await app.client.search.messages({
              // The token you used to initialize your app
              token:
                "xoxp-3728658353141-3731525919715-3725745084550-8b884c964f84e3fa2d59472713fe9a41",
              query: q,
            });
      
            console.log(result);
          } catch (error) {
            console.error(error);
          }
        }
      });
}

export default slackSearchHandler;