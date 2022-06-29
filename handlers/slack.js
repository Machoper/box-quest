import express from 'express';
import app from '@slack/web-api';
import {WebClient, LogLevel} from '@slack/web-api';
var router = express.Router();

const client = new WebClient("xoxb-3728658353141-3731536397859-S8V2qaYw2ct7phFjPUGmaMeo", {logLevel: LogLevel.DEBUG,});

const slackSearchHandler = (search) => {
	return Promise.resolve().then(res => {
			return [{
				title: '#troubleshooting',
				text: 'hello, I’m trying to run yarn install in our gundam service on Monterey. I’m getting and a python2 error',
				url: 'https://box.slack.com/archives/CPMA6LG2C/p1648665574264649',
				channel: '#troubleshooting',
				author: 'Jeremy Stiler',
				avatar_url: "https://thepostsportsbar.com/wp-content/uploads/2017/02/Slack-Logo.png",
				rank: Math.floor(Math.random() * (100 - 85 + 1) + 85)
			}]
	})
}

export default slackSearchHandler;
