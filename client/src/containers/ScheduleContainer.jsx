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
import { useEffect, useState, useContext } from 'react';
import Schedules from '../components/Schedules';
import { FetchContext } from '../context/FetchContext';
import useStyles from './../styles/scheduleContainer';

const ScheduleContainer = () => {
	const classes = useStyles();
	const fetchContext = useContext(FetchContext);
	const [change, setChange] = useState('basketball');
	const [schedules, setSchedules] = useState([]);

	const getAllSched = () => {
		fetchContext.authAxios.get('/schedules').then(({ data }) => {
			setSchedules(data);
		});
	};

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			getAllSched();
		}
		return () => {
			isMounted = false;
		};
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
								Schedules
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
				<Schedules schedules={schedules} change={change} />
			</Paper>
		</>
	);
};

export default ScheduleContainer;
