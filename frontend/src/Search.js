import './Search.css';
import {TextField, FormControl, OutlinedInput} from '@mui/material';

const Search = (props) => {
	const {onKeyPress, ...rest} = props;
	return (
		<div className="bq-SearchBar">
			<OutlinedInput placeholder="Search anything..." fullWidth {...rest} label="Search" onKeyPress={onKeyPress}/>
		</div>
	)
}

export default Search;
