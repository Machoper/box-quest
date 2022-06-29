import * as React from 'react';
import axios from 'axios';
import './App.css';
import {Divider, Stack, Tabs, Tab, Box, Avatar, Chip, Typography, List, ListItem, CircularProgress, Card, ListItemButton, ListItemText } from '@mui/material';
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
				<Box>
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
	const [isLoading, setLoading] = React.useState(false);

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	function handleSearch() {
		setLoading(true);
		axios.post('/api/search', {searchText: searchText})
			.then(resp => {
				setData(resp.data);
				setLoading(false);
			});

	}

	console.log('searchText', searchText);
	const allResults = data.reduce((all, item) => [...all, ...item.results], []);
	allResults.sort((a,b) => b.rank - a.rank);
  return (
    <div className="App">
		<Search value={searchText} onChange={(e) => setSearchText(e.target.value)} onKeyPress={handleKeyPress}/>
		{ isLoading ? <div className="progress"><CircularProgress /><Typography>Going on a quest...</Typography> </div> : <div className="content">
		<Tabs value={tabIndex}>
			{ data.length !== 0 && <Tab key="all" label={`All (${allResults.length})`} onClick={() => setTabIndex(0)} /> }
			{ data.map(({name, results}, index) => <Tab key={index} onClick={() => setTabIndex(index + 1)} label={`${name} (${results.length})`} />)}
		</Tabs>
			<TabPanel value={tabIndex} index={0}>
				<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
					{ allResults.map((result, index) => {
						return (
								<>
								<ListItem className="list-item" key={index}>
									<ListItemButton onClick={()=> window.open(result.url, "_blank")}>
										<Avatar  variant="rounded" src={result.avatar_url}>
											{/*<AssignmentIcon />*/}
										</Avatar>
										<div className="list-item-content">
											<div className="list-item-title">{result.title}<Chip className="chip" variant="outlined" label={`Rank: ${result.rank}/100`} color="primary" /></div>
											<div className="list-item-text">{result.body || result.text}</div>
											<div className="list-item-author">{result.author}</div>

										</div>
									</ListItemButton>
								</ListItem>
									<Divider />
								</>
						)
					})}
				</List>
			</TabPanel>
		{ data.map(({name, results}, index) => {
			results.sort((a,b) => b.rank - a.rank);
			return (
				<TabPanel value={tabIndex} index={index + 1}>
					<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
						{ [...results].map((result, index) => {
							return (
									<>
								<ListItem className="list-item" key={index}>
									<ListItemButton onClick={()=> window.open(result.url, "_blank")}>
										<Avatar  variant="rounded" src={result.avatar_url}>
											{/*<AssignmentIcon />*/}
										</Avatar>
										<div className="list-item-content">
											<div className="list-item-title">{result.title}<Chip className="chip" variant="outlined" label={`Rank: ${result.rank}/100`} color="primary" /></div>
											<div className="list-item-text">{result.body || result.text}</div>
											<div className="list-item-author">{result.author}</div>
										</div>
									</ListItemButton>
								</ListItem>
										<Divider />
									</>
							)
						})}
					</List>
				</TabPanel>
			)
		})}
		</div> }
    </div>
  );
}

export default App;
