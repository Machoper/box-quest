import express from 'express';
import confluenceApiHandler from '../handlers/confluence.js';

var router = express.Router();

const API_HANDLERS = {
	confluence: confluenceApiHandler,
};

const MAX_RESULTS = 25;

/* GET search results */
router.get('', function(req, res, next) {
	const results = Object.keys(API_HANDLERS).map((name) => {
		const handler = API_HANDLERS[name];
		const results = handler().slice(MAX_RESULTS);
		return {
			name,
			results
		}
	});

	res.json(results);
});

export default router;
