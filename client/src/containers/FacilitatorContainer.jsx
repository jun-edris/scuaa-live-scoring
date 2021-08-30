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
import useStyles from './../styles/liveContainer';
import Facilitators from '../components/Facilitators';
import { gameEvent } from './../constants/selection';
import { FetchContext } from '../context/FetchContext';

const FacilitatorContainer = () => {
	const classes = useStyles();
	const fetchContext = useContext(FetchContext);
	const [game, setGameEvent] = useState('basketball');
	const [facilitator, setFacilitator] = useState([]);

	const getFacilitator = () => {
		fetchContext.authAxios
			.get('/get-all-facilitator')
			.then(({ data }) => {
				setFacilitator(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		getFacilitator();
	}, [fetchContext.refreshKey]);

	return (
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
							Facilitators
						</Typography>
					</Grid>
					<Grid item>
						<FormControl variant="outlined" className={classes.formControl}>
							<InputLabel id="Game-Selector">Game</InputLabel>
							<Select
								labelId="Game-Selector"
								id="demo-simple-select-outlined"
								value={game}
								onChange={(e) => setGameEvent(e.target.value)}
								label="Game"
							>
								{gameEvent.map((game, index) => (
									<MenuItem key={index} value={game.value}>
										{game.label}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
				</Grid>
			</Box>
			<Facilitators facilitator={facilitator} game={game} />
		</Paper>
	);
};

export default FacilitatorContainer;
