// Use the slack api to search through all messages within a particular workspace using a query as a parameter.

import axios from 'axios';
import { SearchResult } from '../models/search-result';
import { SearchResultType } from '../models/search-result-type';

export const slackSearchHandler = async (query) => {

    const slackToken = process.env.SLACK_USER_ACCESS_TOKEN;
    const slackWorkspace = "testspace-qch6091.slack.com";
    const slackUrl = `https://slack.com/api/search.messages?token=${slackToken}&query=${query}&pretty=1&count=10&channel=${slackWorkspace}`;

    const response = await axios.get(slackUrl);
    const results = response.data.messages.matches.map(match => {
        const result = new SearchResult();
        result.type = SearchResultType.Slack;
        result.title = match.text;
        result.link = match.url;
        return result;
    }).filter(result => result.title !== '');

    return results;
}




