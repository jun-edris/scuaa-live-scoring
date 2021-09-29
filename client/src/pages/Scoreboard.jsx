import React, { useContext, useEffect, useState } from 'react';
import {
	Grid,
	Container,
	Typography,
	Box,
	Paper,
	Tabs,
	Tab,
	makeStyles,
	CircularProgress,
	Button,
} from '@material-ui/core';
import ScoreTable from '../components/ScoreTable';
import { useParams, useHistory } from 'react-router-dom';
import { FetchContext } from '../context/FetchContext';
import { AuthContext } from '../context/AuthContext';
import SubtituteTable from '../components/SubtituteTable';

const useStyles = makeStyles((theme) => ({
	backGround: {
		position: 'absolute',
		background: `url(${'/images/background.jpg'})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		top: 0,
		right: 0,
		left: 0,
		bottom: 0,
		opacity: '0.8',
		zIndex: -1,
		height: '100%',
	},
	tab: {
		marginLeft: 'auto',
	},
	hideImg: {
		[theme.breakpoints.down('md')]: {
			display: 'none',
		},
	},
}));

const TabPanel = ({ children, value, index }) => {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
		>
			{value === index && <Box pt={1}>{children}</Box>}
		</div>
	);
};

const Scoreboard = () => {
	const classes = useStyles();
	const [tab, setTabs] = useState(0);
	const [live, setLive] = useState({});
	const [loading, setLoading] = useState(false);
	const fetchContext = useContext(FetchContext);
	const authContext = useContext(AuthContext);
	const history = useHistory();
	let { matchId } = useParams();

	const getLive = () => {
		fetchContext.authAxios
			.get(`/live/${matchId}`)
			.then(({ data }) => {
				setLive(data.liveMatch);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		getLive();

		const liveMatchChannel = authContext.pusher.subscribe('liveMatch');

		liveMatchChannel.bind('updated', function (updatedLiveMatch) {
			fetchContext.setLiveMatchList(
				fetchContext.liveMatchList.map((liveMatch) =>
					liveMatch._id === updatedLiveMatch._id
						? {
								...fetchContext.liveMatchList,
								updatedLiveMatch,
						  }
						: liveMatch
				)
			);
			setLive(updatedLiveMatch);
			fetchContext.setRefreshKey((fetchContext.refreshKey = +1));
		});
		return () => {
			liveMatchChannel.unbind_all();
			liveMatchChannel.unsubscribe('liveMatch');
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchContext.refreshKey]);

	let teamOnePlayersOnCourt = live?.teamOne?.players?.filter(
		(players) => players.subtituted === true
	);

	let teamTwoPlayersOnCourt = live?.teamTwo?.players?.filter(
		(players) => players.subtituted === true
	);

	let teamOnePlayersOnBench = live?.teamOne?.players?.filter(
		(players) => players.subtituted === false
	);

	let teamTwoPlayersOnBench = live?.teamTwo?.players?.filter(
		(players) => players.subtituted === false
	);

	let teamOnePlayers = live?.teamOne?.players;
	let teamTwoPlayers = live?.teamTwo?.players;

	let teamOneScore = teamOnePlayers?.reduce(
		(prev, curr) => prev + curr.scores,
		0
	);
	let teamTwoScore = teamTwoPlayers?.reduce(
		(prev, curr) => prev + curr.scores,
		0
	);

	const handleChange = (event, newValue) => {
		setTabs(newValue);
	};

	const doneMatch = async () => {
		try {
			await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/done-schedule/${live.schedule}`
			);
			setTimeout(() => {
				if (authContext.authState.userInfo._id === live?.user) {
					history.push('/dashboard');
				} else {
					history.push('/home');
				}
			}, 400);
		} catch (err) {
			console.log(err?.response?.message);
		}
	};

	const winnerTeam = async (winner) => {
		try {
			setLoading(true);
			if (winner === live.teamOne.teamName) {
				const winnerOfTheGame = {
					winner: winner,
					loser: live.teamTwo.teamName,
				};
				const { data } = await fetchContext.authAxios.patch(
					`/${authContext.authState.userInfo.role}/winner-of-the-game/${matchId}`,
					winnerOfTheGame
				);

				return console.log(data.message);
			}
			if (winner === live.teamTwo.teamName) {
				const winnerOfTheGame = {
					winner: winner,
					loser: live.teamOne.teamName,
				};
				const { data } = await fetchContext.authAxios.patch(
					`/${authContext.authState.userInfo.role}/winner-of-the-game/${matchId}`,
					winnerOfTheGame
				);
				return console.log(data.message);
			}
		} catch (error) {
			const { data } = error.response;
			console.log(data.message);
		}
	};

	const setWinnerTeam = async (winnerOfTeam, loserTeam) => {
		try {
			setLoading(true);
			const winnerOfTheGame = {
				winner: winnerOfTeam,
				loser: loserTeam,
			};
			const { data } = await fetchContext.authAxios.patch(
				`${authContext.authState.userInfo.role}/set-winner-of-the-game/${matchId}`,
				winnerOfTheGame
			);

			return console.log(data.message);
		} catch (error) {
			const { data } = error.response;
			console.log(data.message);
		}
	};

	return (
		<>
			<Container maxWidth="lg">
				<Box pt={4}>
					<Grid container direction="column" spacing={4}>
						<Grid item xs={12}>
							<Paper variant="outlined" className={classes.scoreboard}>
								<Container>
									<Box my={2}>
										<Grid container spacing={4}>
											<Grid item xs={12}>
												<Typography variant="h5" component="h2" align="center">
													{live?.gameEvent}
												</Typography>
											</Grid>
											<Grid item xs={12}>
												<Grid
													container
													justifyContent="space-evenly"
													alignItems="center"
												>
													<Grid item xs={12} md>
														<Grid
															container
															alignItems="center"
															justifyContent="space-evenly"
														>
															<Grid item xs={6} className={classes.hideImg}>
																<img
																	src={`/images/${live?.teamOne?.image}`}
																	style={{
																		height: 'auto',
																		width: '100%',
																	}}
																	alt=""
																/>
															</Grid>
															<Grid item xs={6}>
																<Grid
																	container
																	direction="column"
																	alignItems="center"
																	spacing={3}
																>
																	<Grid item>
																		<Typography variant="h6" component="strong">
																			{live?.teamOne?.teamName}
																		</Typography>
																	</Grid>
																	<Grid item>
																		<Typography variant="h1" component="p">
																			{teamOneScore}
																		</Typography>
																	</Grid>
																	{live?.user ===
																		authContext.authState.userInfo._id && (
																		<Grid item>
																			<Box>
																				<Button
																					variant="contained"
																					style={{
																						backgroundColor: '#4CAF50',
																						color: 'white',
																					}}
																					size="small"
																					fullWidth
																					onClick={() => {
																						const winner =
																							live?.teamOne.teamName;
																						const winnerOfTeam =
																							live?.teamOne._id;
																						const loserTeam = live?.teamTwo._id;
																						winnerTeam(winner);
																						setWinnerTeam(
																							winnerOfTeam,
																							loserTeam
																						);
																						doneMatch();
																					}}
																					disabled={loading === true}
																					startIcon={
																						loading === true ? (
																							<CircularProgress
																								size={20}
																								color="secondary"
																							/>
																						) : null
																					}
																				>
																					Set Team {live?.teamOne?.teamName} as
																					Winner
																				</Button>
																			</Box>
																		</Grid>
																	)}
																</Grid>
															</Grid>
														</Grid>
													</Grid>
													<Grid item xs={12} md>
														<Grid
															container
															alignItems="center"
															justifyContent="space-evenly"
														>
															<Grid item xs={6}>
																<Grid
																	container
																	direction="column"
																	alignItems="center"
																	spacing={3}
																>
																	<Grid item>
																		<Typography variant="h6" component="strong">
																			{live?.teamTwo?.teamName}
																		</Typography>
																	</Grid>
																	<Grid item>
																		<Typography variant="h1" component="p">
																			{teamTwoScore}
																		</Typography>
																	</Grid>
																	{live?.user ===
																		authContext.authState.userInfo._id && (
																		<Grid item>
																			<Box>
																				<Button
																					variant="contained"
																					style={{
																						backgroundColor: '#4CAF50',
																						color: 'white',
																					}}
																					size="small"
																					fullWidth
																					onClick={() => {
																						const winner =
																							live?.teamTwo.teamName;
																						const winnerOfTeam =
																							live?.teamTwo._id;
																						const loserTeam = live?.teamOne._id;
																						winnerTeam(winner);
																						setWinnerTeam(
																							winnerOfTeam,
																							loserTeam
																						);
																						doneMatch();
																					}}
																					disabled={loading === true}
																					startIcon={
																						loading === true ? (
																							<CircularProgress
																								size={20}
																								color="secondary"
																							/>
																						) : null
																					}
																				>
																					Set Team {live?.teamTwo?.teamName} as
																					Winner
																				</Button>
																			</Box>
																		</Grid>
																	)}
																</Grid>
															</Grid>
															<Grid item xs={6} className={classes.hideImg}>
																<img
																	src={`/images/${live?.teamTwo?.image}`}
																	style={{
																		height: 'auto',
																		width: '100%',
																	}}
																	alt=""
																/>
															</Grid>
														</Grid>
													</Grid>
												</Grid>
											</Grid>
											{live?.user !== authContext.authState.userInfo._id &&
												live?.isDone === true && (
													<Grid item xs={12}>
														<Grid
															container
															direction="column"
															alignItems="center"
														>
															<Button
																className={classes.exit}
																variant="contained"
																color="secondary"
																onClick={() => {
																	if (
																		authContext.authState.userInfo._id ===
																		live?.user
																	) {
																		history.push('/dashboard');
																	} else {
																		history.push('/home');
																	}
																}}
															>
																Leave Scoreboard
															</Button>
														</Grid>
													</Grid>
												)}
										</Grid>
									</Box>
								</Container>
							</Paper>
						</Grid>
						<Grid item>
							<Paper>
								<Tabs
									value={tab}
									onChange={handleChange}
									indicatorColor="primary"
									textColor="primary"
								>
									<Tab label={live?.teamOne?.teamName} />
									<Tab
										label={live?.teamTwo?.teamName}
										className={classes.tab}
									/>
								</Tabs>
							</Paper>
							<TabPanel value={tab} index={0}>
								<Box mb={3}>
									<Typography variant="subtitle1" component="strong">
										On Court
									</Typography>
									<ScoreTable
										user={live?.user}
										matchId={matchId}
										gameEvent={live?.gameEvent}
										players={teamOnePlayersOnCourt}
									/>
								</Box>
								<Box mb={3}>
									<Typography variant="subtitle1" component="strong">
										Subtitutes
									</Typography>
									<SubtituteTable
										user={live?.user}
										matchId={matchId}
										gameEvent={live?.gameEvent}
										players={teamOnePlayersOnBench}
									/>
								</Box>
							</TabPanel>
							<TabPanel value={tab} index={1}>
								<Box mb={3}>
									<Typography variant="subtitle1" component="strong">
										On Court
									</Typography>
									<ScoreTable
										user={live?.user}
										matchId={matchId}
										gameEvent={live?.gameEvent}
										players={teamTwoPlayersOnCourt}
									/>
								</Box>
								<Box mb={3}>
									<Typography variant="subtitle1" component="strong">
										Subtitutes
									</Typography>
									<SubtituteTable
										user={live?.user}
										matchId={matchId}
										gameEvent={live?.gameEvent}
										players={teamTwoPlayersOnBench}
									/>
								</Box>
							</TabPanel>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</>
	);
};

export default Scoreboard;
