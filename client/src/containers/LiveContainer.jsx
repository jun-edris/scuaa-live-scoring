import {
	Box,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Typography,
} from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import LiveTable from '../components/LiveTable';
import { FetchContext } from '../context/FetchContext';
import useStyles from './../styles/liveContainer';

const LiveContainer = () => {
	const classes = useStyles();
	const [change, setChange] = useState('basketball');
	const [live, setLive] = useState([]);
	const fetchContext = useContext(FetchContext);

	const getLiveMatches = () => {
		fetchContext.authAxios
			.get('/all-live-match/')
			.then(({ data }) => {
				setLive(data);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		getLiveMatches();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchContext.refreshKey]);

	return (
		<>
			<Paper>
				<Box px={2}>
					<Grid
						container
						direction="row"
						alignItems="center"
						justifyContent="space-between"
						style={{ padding: '8px 8px' }}
					>
						<Grid item>
							<Typography variant="h6" color="primary">
								In Game
							</Typography>
						</Grid>
						<Grid item>
							<FormControl variant="outlined" className={classes.formControl}>
								<InputLabel id="Game-Selector">Game</InputLabel>
								<Select
									labelId="Game-Selector"
									id="demo-simple-select-outlined"
									value={change}
									onChange={(e) => setChange(e.target.value)}
									label="Game"
								>
									<MenuItem value="basketball">Basketball</MenuItem>
									<MenuItem value="volleyball">Volleyball</MenuItem>
									<MenuItem value="soccer">Soccer</MenuItem>
								</Select>
							</FormControl>
						</Grid>
					</Grid>
				</Box>
				<LiveTable live={live} change={change} />
			</Paper>
		</>
	);
};

export default LiveContainer;
