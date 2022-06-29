import * as React from 'react';
import axios from 'axios';
import './App.css';
import {Tabs, Tab, Box, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Search from './Search';

const fakeResults = [
	{name: 'Slack', results: [1, 2, 3, 4]},
	{name: 'Confluence', results: [1, 3, 4, 5]},
	{name: 'Stack Overflow', results: []},
	{name: 'Box Notes', results: []},
]

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
			<div
					role="tabpanel"
					hidden={value !== index}
					id={`simple-tabpanel-${index}`}
					aria-labelledby={`simple-tab-${index}`}
					{...other}
			>
				{value === index && (
						<Box sx={{ p: 3 }}>
							{children}
						</Box>
				)}
			</div>
	);
}

function App() {
	const [data, setData] = React.useState([]);
	const [tabIndex, setTabIndex] = React.useState(0);
	const [searchText, setSearchText] = React.useState('');
	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	function handleSearch() {
		axios.post('/api/search', {searchText: searchText})
				.then(resp => {
					console.log('resp', resp.data);
					setData(resp.data);
				});

	}
  return (
    <div className="App">
		<Search value={searchText} onChange={(e) => setSearchText(e.target.value)} onKeyPress={handleKeyPress}/>
		<Tabs value={tabIndex}>
			{ data.map(({name, results}, index) => <Tab key={index} onClick={() => setTabIndex(index)} label={name} />)}
		</Tabs>
		{ data.map(({name, results}, index) => {
			console.log('results', data, name, results);
			return (
					<TabPanel value={tabIndex} index={index}>
						<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
							{ [...results].map((result, index) => {
								return (
										<ListItem key={index}>
											<ListItemButton>{result.body}</ListItemButton>
											{/*<ListItemText primary={name} />*/}
										</ListItem>
								)
							})}

						</List>
					</TabPanel>
			)
		})}
    </div>
  );
}

export default App;
