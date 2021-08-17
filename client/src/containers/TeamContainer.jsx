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
import { useContext, useState, useEffect } from 'react';
import Teams from '../components/Teams';
import { FetchContext } from '../context/FetchContext';
import useStyles from './../styles/teamContainer';

const TeamContainer = () => {
	const classes = useStyles();
	const fetchContext = useContext(FetchContext);
	const [change, setChange] = useState('basketball');

	return (
		<>
			<Paper>
				<Box px={2}>
					<Grid
						container
						direction="row"
						alignItems="center"
						justify="space-between"
						style={{ padding: '8px 8px' }}
					>
						<Grid item>
							<Typography variant="h6" color="primary">
								Teams
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
				<Teams teams={fetchContext.teams} change={change} />
			</Paper>
		</>
	);
};

export default TeamContainer;
