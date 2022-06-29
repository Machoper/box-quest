import axios from 'axios';
import express from 'express';

var router = express.Router();

const stackOverflowApiHandler = async (searchText) => {
	const team = 'stackoverflow.com/c/enterprise-at-box';
	const key = process.env.STACK_OVERFLOW_KEY;
	const accessToken = process.env.STACK_OVERFLOW_ACCESS_TOKEN;
	const url = `https://api.stackexchange.com/2.3/search/excerpts?order=desc&sort=activity&title=${searchText}&site=stackoverflow&key=${key}&team=${team}`;
	const config = {
		headers: {
			'X-API-Access-Token': accessToken
		}
	};
	return axios.get(url, config).then((response) => {
		const data = response.data;
		data.items.forEach(item => {
			if (item.item_type === 'question') {
				const qid = item.question_id;
				item.link = `https://stackoverflow.com/c/enterprise-at-box/questions/${qid}`;
			}
		});
		return data.items
	});
}

export default stackOverflowApiHandler;
