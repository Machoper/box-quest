import express from 'express';
import axios from 'axios';

const router = express.Router();

const confluenceApiHandler = async (searchText) => {
	const accessToken = process.env.CONFLUENCE_ACCESS_TOKEN;
	// const cql = `type=page AND (title ~${searchText} OR text ~${searchText})`;
	const cql = `siteSearch ~${searchText}`;
	const url = `https://confluence.inside-box.net/rest/api/search?cql=${cql}`;
	const config = {
		headers: {
			'Authorization': `Bearer ${accessToken}`
		}
	};
	return axios.get(url, config).then((response) => {
		return response.data.results;
	});
}

export default confluenceApiHandler;
