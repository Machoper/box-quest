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
		return response.data.results.map(result => {
			return {
				title: result.content.title,
				text: result.excerpt,
				url: `https://confluence.inside-box.net${result.url}`,
				author: result.resultGlobalContainer.title,
				date: result.lastModified,
				payload: result,
				avatar_url: "https://seeklogo.com/images/C/confluence-logo-D9B07137C2-seeklogo.com.png",
				rank: Math.floor(Math.random() * (100 - 85 + 1) + 85)
			}
		});
	});
}

export default confluenceApiHandler;
