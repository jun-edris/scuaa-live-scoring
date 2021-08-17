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
import { useState } from 'react';
import Standings from '../components/Standings';
import useStyles from './../styles/standingContainer';
const StandingContainer = () => {
	const classes = useStyles();
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
								Standings
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
				<Standings />
			</Paper>
		</>
	);
};

export default StandingContainer;
