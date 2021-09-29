import {
	Avatar,
	Box,
	Chip,
	Divider,
	FormControl,
	Grid,
	InputLabel,
	List,
	ListItem,
	ListSubheader,
	MenuItem,
	Paper,
	Select,
	Typography,
} from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import { FetchContext } from '../context/FetchContext';
import useWindowDimensions from '../hooks/useWindowDimensions';
import useStyles from './../styles/ingameList';
import CustomButton from './common/CustomButton';
import { useHistory } from 'react-router-dom';

const InGameList = () => {
	const history = useHistory();
	const classes = useStyles();
	const [change, setChange] = useState('basketball');
	const [live, setLive] = useState([]);
	const { width } = useWindowDimensions();
	const fetchContext = useContext(FetchContext);

	let matchByEvent = live.filter((live) => live.gameEvent === change);

	const getLiveMatches = () => {
		fetchContext.authAxios
			.get('/all-not-done-live-match/')
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
			<Grid
				container
				direction="column"
				justifyContent="flex-start"
				alignItems="center"
			>
				<List
					className={classes.root}
					subheader={
						<ListSubheader
							id="nested-list-subheader"
							style={{
								paddingTop: '10px',
								height: '100px',
							}}
						>
							<Grid
								container
								justifyContent="space-between"
								alignItems="center"
							>
								<Grid item>
									<Typography variant="h6">In Game</Typography>
								</Grid>
								<Grid item>
									<FormControl
										variant="outlined"
										className={classes.formControl}
									>
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
						</ListSubheader>
					}
					component={Paper}
				>
					{matchByEvent.length === 0 ? (
						<ListItem>No recent live</ListItem>
					) : (
						matchByEvent.map((live, index) => (
							<ListItem
								key={index}
								style={{
									marginBottom: '20px',
								}}
							>
								<Paper elevation={3} square className={classes.content}>
									<Box px={width < 1056 ? 1 : 3} pt={2} pb={1}>
										<Grid
											container
											direction="column"
											justifyContent="center"
											alignItems="stretch"
											spacing={2}
										>
											<Grid item>
												<Grid
													container
													direction="row"
													alignItems="center"
													justifyContent="space-between"
												>
													<Chip
														label={
															<Typography variant="caption">
																&bull;&nbsp;<strong>Live</strong>
															</Typography>
														}
													/>
												</Grid>
											</Grid>
											<Divider />
											<Grid item md>
												<Grid
													container
													direction="row"
													alignItems="center"
													justifyContent="space-evenly"
													spacing={2}
												>
													<Grid item>
														<Grid
															container
															direction="column"
															alignItems="center"
															justifyContent="space-between"
														>
															<Grid item>
																<Avatar
																	alt="Team Logo"
																	src={`/images/${live?.teamOne?.image}`}
																/>
															</Grid>
															<Grid item>
																<Typography variant="overline">
																	{live?.teamOne?.teamName}
																</Typography>
															</Grid>
														</Grid>
													</Grid>
													<Grid item>
														<Grid
															container
															direction="column"
															alignItems="center"
															justifyContent="space-between"
														>
															<Grid item>
																<Typography variant="h6" component="span">
																	VS
																</Typography>
															</Grid>
														</Grid>
													</Grid>
													<Grid item>
														<Grid
															container
															direction="column"
															alignItems="center"
															justifyContent="space-between"
														>
															<Grid item>
																<Avatar
																	alt="Team Logo"
																	src={`/images/${live?.teamTwo?.image}`}
																/>
															</Grid>
															<Grid item>
																<Typography variant="overline">
																	{live?.teamTwo?.teamName}
																</Typography>
															</Grid>
														</Grid>
													</Grid>
												</Grid>
											</Grid>
											<Grid item>
												<CustomButton
													title="Watch"
													variant="contained"
													fullWidth
													color="primary"
													onClick={() =>
														history.push(`/scoreboard/${live._id}`)
													}
												/>
											</Grid>
										</Grid>
									</Box>
								</Paper>
							</ListItem>
						))
					)}
				</List>
			</Grid>
		</>
	);
};

export default InGameList;
