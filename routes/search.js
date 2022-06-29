import express from 'express';
import confluenceApiHandler from '../handlers/confluence.js';
import stackOverflowApiHandler from '../handlers/stackOverflow.js';
import boxNotesSearchHandler from '../handlers/boxNotes.js';

var router = express.Router();

const API_HANDLERS = {
	confluence: confluenceApiHandler,
	['stack-overflow']: stackOverflowApiHandler,
	['box-notes']: boxNotesSearchHandler,
};

const MAX_RESULTS = 25;

const getResponse = (search, appNames) => {
	return Promise.all(Object.keys(API_HANDLERS).filter(key => appNames.includes(key)).map(name => API_HANDLERS[name]().then(results => {
		return {name, results};
	}).catch(err => {
		console.log('error', err);
		return {name, results: []};
	})));
}

/* GET search results */
router.post('/', function(req, res) {
	const searchText = req.body.searchText || '';

	const responsePromise = getResponse(searchText, Object.keys(API_HANDLERS));
	responsePromise.then(results => res.json(results));
});

router.post('/:appName', (req, res) => {
	const searchText = req.body.searchText || '';

	const responsePromise = getResponse(searchText, [req.params.appName]);
	responsePromise.then(results => res.json(results));
});

export default router;
