import { Grid, InputAdornment, Toolbar, Typography } from '@material-ui/core';
import SearchInput from './common/SearchInput';
import { Search } from '@material-ui/icons/';

const TableHeader = ({ title, handleSearch }) => {
	return (
		<>
			<Toolbar>
				<Grid container direction="row" justify="space-between">
					<Grid item>
						<Typography variant="h6">{title}</Typography>
					</Grid>
					<Grid item xs={3}>
						<SearchInput
							label="Search"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Search />
									</InputAdornment>
								),
							}}
							onChange={handleSearch}
						/>
					</Grid>
				</Grid>
			</Toolbar>
		</>
	);
};

export default TableHeader;
