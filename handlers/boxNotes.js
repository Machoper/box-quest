import express from 'express';
import BoxSDK from 'box-node-sdk';

const router = express.Router();

//Not used. It takes a fileId and streams the text contents and returns as a string.
const getRepresentationContentAttempt = async (fileId) => {

	const p = new Promise((resolve, reject) => {
		try {
			client.files.getRepresentationContent(fileId, client.files.representation.EXTRACTED_TEXT).then(stream => {
				let chunks = [];
				stream.on('data', chunk => {
					chunks = [...chunks, chunk];
				});
				stream.on('end', () => {
					resolve(Buffer.concat(chunks).toString('utf8'));
				});
				stream.on('error', err => {
					reject(err);
				});
			});
		} catch (error) {
			reject(error);
		}
	});
	return p;
};

const boxNotesSearchHandler = async (search) => {

	const clientID = process.env.BOX_NOTES_CLIENT_ID;
	const clientSecret = process.env.BOX_NOTES_CLIENT_SECRET;
	const accessToken = process.env.BOX_NOTES_ACCESS_TOKEN;

	const sdk = new BoxSDK({
		clientID,
		clientSecret,
	});

	const client = sdk.getBasicClient(accessToken);

	const results = await client.search.query(
			search,
			{
				content_types: ['file_content', 'name', 'description'],
				file_extensions: 'boxnote',
				limit: 25,
				offset: 0
			})

	const searchResults = results.entries.map((result) => {
		return {
			source: "box_notes",
			title: result.name,
			text: `Lorem ipsum`,
			url: `https://cloud.app.box.com/notes/${result.id}`,
			author: result.owned_by.name,
			date: result.modified_at,
			avatar_url: null,
			payload: result
		}
	})

	return new Promise((resolve, reject) => {
		resolve(searchResult);
	})
}

export default boxNotesSearchHandler;
