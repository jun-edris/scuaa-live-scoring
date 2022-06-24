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
	ButtonGroup,
} from '@material-ui/core';
import ScoreTable from '../components/ScoreTable';
import { useParams, useHistory } from 'react-router-dom';
import { FetchContext } from '../context/FetchContext';
import { AuthContext } from '../context/AuthContext';
import SubtituteTable from '../components/SubtituteTable';
import Timer from '../components/Timer';
import StatsTable from '../components/StatsTable';

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
			style={{ minWidth: 320 }}
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
	const [sets, setSets] = useState([]);
	const [set, setSet] = useState({});
	const fetchContext = useContext(FetchContext);
	const authContext = useContext(AuthContext);
	const history = useHistory();
	let { matchId } = useParams();
	let won = '';

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

	const getSets = () => {
		fetchContext.authAxios
			.get(`/sets/${matchId}`)
			.then(({ data }) => {
				setSets(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const getSet = (setNum) => {
		fetchContext.authAxios
			.get(`/set/${matchId}`, { params: { setNum: setNum } })
			.then(({ data }) => {
				const toObject = Object.assign({}, data.sets);
				setSet(toObject[0]);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		getLive();
		getSets();
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
	}, [fetchContext.refreshKey, live]);

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
	let teamOneVolleyballPlayers =
		live?.gameEvent === 'volleyball' ? set?.teamOne?.players : [];
	let teamTwoVolleyballPlayers =
		live?.gameEvent === 'volleyball' ? set?.teamTwo?.players : [];

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
				`/${authContext.authState.userInfo.role}/done-schedule/${live?.schedule}`
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

	const SetSet = async (name, set) => {
		try {
			setLoading(true);
			if (teamOneScore > teamTwoScore) {
				won = live?.teamOne.teamName;
			}
			if (teamTwoScore > teamOneScore) {
				won = live?.teamTwo.teamName;
			}

			const finishedSet = {
				setName: name,
				no: set,
				teamOne: live?.teamOne,
				teamTwo: live?.teamTwo,
				won: won,
				gameEvent: live?.gameEvent,
			};
			setLoading(false);
			await fetchContext.authAxios.patch(
				`${authContext.authState.userInfo.role}/set-set/${matchId}`,
				finishedSet
			);
		} catch (error) {
			const { data } = error.response;
			console.log(data.message);
		}
	};

	const startTime = async () => {
		try {
			await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/start-time/${live?._id}`
			);
		} catch (err) {
			console.log(err?.response?.message);
		}
	};

	const resetSetVolleyball = async (name, set) => {
		try {
			setLoading(true);
			if (teamOneScore > teamTwoScore) {
				won = live?.teamOne.teamName;
			}
			if (teamTwoScore > teamOneScore) {
				won = live?.teamTwo.teamName;
			}

			const finishedSet = {
				setName: name,
				no: set,
				teamOne: live?.teamOne,
				teamTwo: live?.teamTwo,
				won: won,
			};
			setLoading(false);
			await fetchContext.authAxios.patch(
				`${authContext.authState.userInfo.role}/reset-set/${matchId}`,
				finishedSet
			);
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
						<Grid item>
							<Paper variant="outlined" className={classes.scoreboard}>
								<Container>
									<Box my={2}>
										<Grid container spacing={4}>
											<Grid item xs={12}>
												<Typography
													variant="subtitle1"
													component="h2"
													align="center"
													style={{ textTransform: 'uppercase' }}
												>
													{live?.gameEvent}
												</Typography>
											</Grid>
											<Grid item xs={12}>
												<Typography
													variant="h5"
													component="h2"
													align="center"
													style={{ textTransform: 'uppercase' }}
												>
													{live?.setName}
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
																		<>
																			<Grid item>
																				<Box>
																					{live?.gameEvent === 'basketball' &&
																						teamOneScore > teamTwoScore &&
																						live?.setName ===
																							'Fourth Quarter' && (
																							<Button
																								variant="contained"
																								style={{
																									backgroundColor: '#4CAF50',
																									color: 'white',
																								}}
																								size="small"
																								fullWidth
																								disabled={loading === true}
																								onClick={() => {
																									const winner =
																										live?.teamOne.teamName;
																									const winnerOfTeam =
																										live?.teamOne._id;
																									const loserTeam =
																										live?.teamTwo._id;
																									winnerTeam(winner);
																									setWinnerTeam(
																										winnerOfTeam,
																										loserTeam
																									);
																									doneMatch();
																								}}
																								startIcon={
																									loading === true ? (
																										<CircularProgress
																											size={20}
																											color="secondary"
																										/>
																									) : null
																								}
																							>
																								Set Team{' '}
																								{live?.teamOne?.teamName} as
																								Winner
																							</Button>
																						)}

																					{live?.gameEvent === 'volleyball' &&
																						(live?.teamOne?.wonSets === 2 ||
																							(live?.teamOne?.wonSets === 2 &&
																								(live?.numSets === 3 ||
																									live?.setName ===
																										'Finish')) ||
																							live?.teamOne.wonSets === 3 ||
																							(live?.teamOne.wonSets === 3 &&
																								live?.numSets === 5 &&
																								live?.setName ===
																									'Finish')) && (
																							<Button
																								variant="contained"
																								style={{
																									backgroundColor: '#4CAF50',
																									color: 'white',
																								}}
																								size="small"
																								fullWidth
																								disabled={loading === true}
																								onClick={() => {
																									const winner =
																										live?.teamOne.teamName;
																									const winnerOfTeam =
																										live?.teamOne._id;
																									const loserTeam =
																										live?.teamTwo._id;
																									winnerTeam(winner);
																									setWinnerTeam(
																										winnerOfTeam,
																										loserTeam
																									);
																									doneMatch();
																								}}
																								startIcon={
																									loading === true ? (
																										<CircularProgress
																											size={20}
																											color="secondary"
																										/>
																									) : null
																								}
																							>
																								Set Team{' '}
																								{live?.teamOne?.teamName} as
																								Winner
																							</Button>
																						)}
																				</Box>
																			</Grid>
																		</>
																	)}
																</Grid>
															</Grid>
														</Grid>
													</Grid>
													{live?.user === authContext.authState.userInfo._id &&
														(live?.gameEvent === 'basketball' ||
															live?.gameEvent === 'soccer') && (
															<Grid item xs={12} md>
																<Timer
																	live={live}
																	setLive={setLive}
																	teamOnePlayers={teamOnePlayersOnCourt.length}
																	teamTwoPlayers={teamTwoPlayersOnCourt.length}
																/>
															</Grid>
														)}

													{live?.user === authContext.authState.userInfo._id &&
														live?.gameEvent === 'volleyball' &&
														live?.setName !== 'Finish' &&
														((live?.numSets === 3 &&
															live?.teamOne.wonSets !== 2 &&
															live?.teamTwo.wonSets !== 2) ||
															(live?.numSets === 5 &&
																live?.teamOne.wonSets !== 3 &&
																live?.teamTwo.wonSets !== 3)) && (
															<Grid item>
																<Button
																	variant="contained"
																	onClick={() => startTime()}
																	disabled={
																		teamOnePlayersOnCourt.length !== 6 ||
																		teamTwoPlayersOnCourt.length !== 6
																	}
																>
																	{live?.startTime === false
																		? 'Start'
																		: 'Timeout'}
																</Button>
															</Grid>
														)}

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
																				{live?.gameEvent === 'basketball' &&
																					teamTwoScore > teamOneScore &&
																					live?.setName ===
																						'Fourth Quarter' && (
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
																								const loserTeam =
																									live?.teamOne._id;
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
																							Set Team {live?.teamTwo?.teamName}{' '}
																							as Winner
																						</Button>
																					)}

																				{live?.gameEvent === 'volleyball' &&
																					(live?.teamTwo?.wonSets === 2 ||
																						(live?.teamTwo?.wonSets === 2 &&
																							(live?.numSets === 3 ||
																								live?.setName === 'Finish')) ||
																						live?.teamTwo.wonSets === 3 ||
																						(live?.teamTwo.wonSets === 3 &&
																							live?.numSets === 5 &&
																							live?.setName === 'Finish')) && (
																						<Button
																							variant="contained"
																							style={{
																								backgroundColor: '#4CAF50',
																								color: 'white',
																							}}
																							size="small"
																							fullWidth
																							disabled={loading === true}
																							onClick={() => {
																								const winner =
																									live?.teamTwo.teamName;
																								const winnerOfTeam =
																									live?.teamTwo._id;
																								const loserTeam =
																									live?.teamOne._id;
																								winnerTeam(winner);
																								setWinnerTeam(
																									winnerOfTeam,
																									loserTeam
																								);
																								doneMatch();
																							}}
																							startIcon={
																								loading === true ? (
																									<CircularProgress
																										size={20}
																										color="secondary"
																									/>
																								) : null
																							}
																						>
																							Set Team {live?.teamTwo?.teamName}{' '}
																							as Winner
																						</Button>
																					)}
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
												{live?.user === authContext.authState.userInfo._id &&
													live?.gameEvent === 'volleyball' && (
														<Grid
															container
															justifyContent="center"
															alignItems="center"
															spacing={2}
														>
															{live?.numSets === 3 && (
																<>
																	{live?.setName === 'First Set' &&
																		(teamOneScore >= 25 ||
																			teamTwoScore >= 25) &&
																		teamOneScore !== teamTwoScore &&
																		(teamOneScore - teamTwoScore > 1 ||
																			teamTwoScore - teamOneScore > 1) && (
																			<Grid item>
																				<Button
																					variant="contained"
																					color="secondary"
																					size="small"
																					disabled={loading === true}
																					onClick={() => {
																						const set = 1;
																						const name = 'Second Set';
																						resetSetVolleyball(name, set);
																					}}
																					startIcon={
																						loading === true ? (
																							<CircularProgress
																								size={20}
																								color="secondary"
																							/>
																						) : null
																					}
																				>
																					End of the First Set
																				</Button>
																			</Grid>
																		)}
																	{live?.setName === 'Second Set' &&
																		(teamOneScore >= 25 ||
																			teamTwoScore >= 25) &&
																		teamOneScore !== teamTwoScore &&
																		(teamOneScore - teamTwoScore > 1 ||
																			teamTwoScore - teamOneScore > 1) && (
																			<Grid item>
																				<Button
																					variant="contained"
																					color="secondary"
																					size="small"
																					disabled={loading === true}
																					onClick={() => {
																						const set = 2;
																						const name = 'Third Set';
																						resetSetVolleyball(name, set);
																					}}
																					startIcon={
																						loading === true ? (
																							<CircularProgress
																								size={20}
																								color="secondary"
																							/>
																						) : null
																					}
																				>
																					End of the Second Set
																				</Button>
																			</Grid>
																		)}
																	{live?.setName === 'Third Set' &&
																		(teamOneScore >= 15 ||
																			teamTwoScore >= 15) &&
																		teamOneScore !== teamTwoScore &&
																		(teamOneScore - teamTwoScore > 1 ||
																			teamTwoScore - teamOneScore > 1) && (
																			<Grid item>
																				<Button
																					variant="contained"
																					color="secondary"
																					size="small"
																					disabled={
																						loading === true &&
																						live?.setName !== 'Finish'
																					}
																					onClick={() => {
																						const set = 3;
																						const name = 'Finish';
																						resetSetVolleyball(name, set);
																					}}
																					startIcon={
																						loading === true ? (
																							<CircularProgress
																								size={20}
																								color="secondary"
																							/>
																						) : null
																					}
																				>
																					End of the Third Set
																				</Button>
																			</Grid>
																		)}
																</>
															)}
															{live?.numSets === 5 && (
																<>
																	{live?.setName === 'First Set' &&
																		(teamOneScore >= 25 ||
																			teamTwoScore >= 25) &&
																		teamOneScore !== teamTwoScore &&
																		(teamOneScore - teamTwoScore !== 1 ||
																			-1) && (
																			<Grid item>
																				<Button
																					variant="contained"
																					color="secondary"
																					size="small"
																					disabled={loading === true}
																					onClick={() => {
																						const set = 1;
																						const name = 'Second Set';
																						resetSetVolleyball(name, set);
																					}}
																					startIcon={
																						loading === true ? (
																							<CircularProgress
																								size={20}
																								color="secondary"
																							/>
																						) : null
																					}
																				>
																					End of the First Set
																				</Button>
																			</Grid>
																		)}
																	{live?.setName === 'Second Set' &&
																		(teamOneScore >= 25 ||
																			teamTwoScore >= 25) &&
																		teamOneScore !== teamTwoScore &&
																		(teamOneScore - teamTwoScore !== 1 ||
																			-1) && (
																			<Grid item>
																				<Button
																					variant="contained"
																					color="secondary"
																					size="small"
																					disabled={loading === true}
																					onClick={() => {
																						const set = 2;
																						const name = 'Third Set';
																						resetSetVolleyball(name, set);
																					}}
																					startIcon={
																						loading === true ? (
																							<CircularProgress
																								size={20}
																								color="secondary"
																							/>
																						) : null
																					}
																				>
																					End of the Second Set
																				</Button>
																			</Grid>
																		)}
																	{live?.setName === 'Third Set' &&
																		(teamOneScore >= 25 ||
																			teamTwoScore >= 25) &&
																		teamOneScore !== teamTwoScore &&
																		(teamOneScore - teamTwoScore !== 1 ||
																			-1) && (
																			<Grid item>
																				<Button
																					variant="contained"
																					color="secondary"
																					size="small"
																					disabled={loading === true}
																					onClick={() => {
																						const set = 3;
																						const name = 'Fourth Set';
																						resetSetVolleyball(name, set);
																					}}
																					startIcon={
																						loading === true ? (
																							<CircularProgress
																								size={20}
																								color="secondary"
																							/>
																						) : null
																					}
																				>
																					End of the Third Set
																				</Button>
																			</Grid>
																		)}
																	{live?.setName === 'Fourth Set' &&
																		(teamOneScore >= 25 ||
																			teamTwoScore >= 25) &&
																		teamOneScore !== teamTwoScore &&
																		(teamOneScore - teamTwoScore !== 1 ||
																			-1) && (
																			<Grid item>
																				<Button
																					variant="contained"
																					color="secondary"
																					size="small"
																					disabled={loading === true}
																					onClick={() => {
																						const set = 4;
																						const name =
																							live?.teamOne.wonSets !== 3 ||
																							live?.teamTwo.wonSets !== 3
																								? 'Fifth Set'
																								: 'Finish';
																						resetSetVolleyball(name, set);
																					}}
																					startIcon={
																						loading === true ? (
																							<CircularProgress
																								size={20}
																								color="secondary"
																							/>
																						) : null
																					}
																				>
																					End of the Fourth Set
																				</Button>
																			</Grid>
																		)}
																	{live?.setName === 'Fifth Set' &&
																		(teamOneScore >= 15 ||
																			teamTwoScore >= 15) &&
																		teamOneScore !== teamTwoScore &&
																		(teamOneScore - teamTwoScore !== 1 ||
																			-1) && (
																			<Grid item>
																				<Button
																					variant="contained"
																					color="secondary"
																					size="small"
																					disabled={loading === true}
																					onClick={() => {
																						const set = 5;
																						const name = 'Finish';
																						resetSetVolleyball(name, set);
																					}}
																					startIcon={
																						loading === true ? (
																							<CircularProgress
																								size={20}
																								color="secondary"
																							/>
																						) : null
																					}
																				>
																					{live?.teamOne.wonSets !== 3 ||
																					live?.teamTwo.wonSets !== 3
																						? 'End of the Fifth Set'
																						: 'Finish'}
																				</Button>
																			</Grid>
																		)}
																</>
															)}
														</Grid>
													)}
												{live?.user === authContext.authState.userInfo._id &&
													live?.gameEvent === 'basketball' && (
														<Grid
															container
															justifyContent="space-evenly"
															alignItems="center"
														>
															{live?.setName === 'First Quarter' &&
																live?.timeGiven === 0 && (
																	<Grid item>
																		<Button
																			variant="contained"
																			color="secondary"
																			size="small"
																			disabled={loading === true}
																			onClick={() => {
																				// score++;
																				// const currentPlayer = player?._id;
																				// addScore(score, currentPlayer);
																				const set = 1;
																				const name = 'Second Quarter';
																				SetSet(name, set);
																			}}
																			startIcon={
																				loading === true ? (
																					<CircularProgress
																						size={20}
																						color="secondary"
																					/>
																				) : null
																			}
																		>
																			End of the First Quarter
																		</Button>
																	</Grid>
																)}
															{live?.setName === 'Second Quarter' &&
																live?.timeGiven === 0 && (
																	<Grid item>
																		<Button
																			variant="contained"
																			color="secondary"
																			size="small"
																			disabled={loading === true}
																			onClick={() => {
																				// score++;
																				// const currentPlayer = player?._id;
																				// addScore(score, currentPlayer);
																				const set = 2;
																				const name = 'Third Quarter';
																				SetSet(name, set);
																			}}
																			startIcon={
																				loading === true ? (
																					<CircularProgress
																						size={20}
																						color="secondary"
																					/>
																				) : null
																			}
																		>
																			End of the Second Quarter
																		</Button>
																	</Grid>
																)}
															{live?.setName === 'Third Quarter' &&
																live?.timeGiven === 0 && (
																	<Grid item>
																		<Button
																			variant="contained"
																			color="secondary"
																			size="small"
																			disabled={loading === true}
																			onClick={() => {
																				// score++;
																				// const currentPlayer = player?._id;
																				// addScore(score, currentPlayer);
																				const set = 3;
																				const name = 'Fourth Quarter';
																				SetSet(name, set);
																			}}
																			startIcon={
																				loading === true ? (
																					<CircularProgress
																						size={20}
																						color="secondary"
																					/>
																				) : null
																			}
																		>
																			End of the Third Quarter
																		</Button>
																	</Grid>
																)}
															{live?.setName === 'Fourth Quarter' &&
																live?.timeGiven === 0 && (
																	<Grid item>
																		<Button
																			variant="contained"
																			color="secondary"
																			size="small"
																			disabled={loading === true}
																			onClick={() => {
																				// score++;
																				// const currentPlayer = player?._id;
																				// addScore(score, currentPlayer);
																				const set = 4;
																				const name = 'Finish';
																				SetSet(name, set);
																			}}
																			startIcon={
																				loading === true ? (
																					<CircularProgress
																						size={20}
																						color="secondary"
																					/>
																				) : null
																			}
																		>
																			End of the Fourth Quarter
																		</Button>
																	</Grid>
																)}
														</Grid>
													)}
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
						</Grid>

						{/* teamOne */}
						<Grid item xs={12} sm md={12} lg={12}>
							<TabPanel value={tab} index={0}>
								<Grid container direction="column" style={{ width: '100%' }}>
									<Grid item xs={12} sm={12} md={12}>
										<Typography variant="subtitle1" component="strong">
											On Court
										</Typography>
										<ScoreTable
											user={live?.user}
											matchId={matchId}
											gameEvent={live?.gameEvent}
											players={teamOnePlayersOnCourt}
											startTime={live?.startTime}
											timeGiven={live?.timeGiven}
											score={teamOneScore}
											scoreOpponent={teamTwoScore}
											setN={live?.setName}
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={12} style={{ marginTop: 4 }}>
										<Typography variant="subtitle1" component="strong">
											Subtitutes
										</Typography>
										<SubtituteTable
											user={live?.user}
											matchId={matchId}
											gameEvent={live?.gameEvent}
											players={teamOnePlayersOnBench}
											onCourt={teamOnePlayersOnCourt}
										/>
									</Grid>
								</Grid>
							</TabPanel>
						</Grid>
						{/* teamTwo */}
						<Grid item xs={12} sm md={12} lg={12}>
							<TabPanel value={tab} index={1}>
								<Grid container direction="column" style={{ width: '100%' }}>
									<Grid item xs={12} sm={12} md={12}>
										<Box mb={3}>
											<Typography variant="subtitle1" component="strong">
												On Court
											</Typography>
											<ScoreTable
												user={live?.user}
												matchId={matchId}
												gameEvent={live?.gameEvent}
												players={teamTwoPlayersOnCourt}
												startTime={live?.startTime}
												timeGiven={live?.timeGiven}
												score={teamTwoScore}
												scoreOpponent={teamOneScore}
												setN={live?.setName}
												numSet={live?.numSets}
											/>
										</Box>
									</Grid>
									<Grid item xs={12} sm={12} md={12}>
										<Box mb={3}>
											<Typography variant="subtitle1" component="strong">
												Subtitutes
											</Typography>
											<SubtituteTable
												user={live?.user}
												matchId={matchId}
												gameEvent={live?.gameEvent}
												players={teamTwoPlayersOnBench}
												onCourt={teamTwoPlayersOnCourt}
											/>
										</Box>
									</Grid>
								</Grid>
							</TabPanel>
						</Grid>
					</Grid>
				</Box>
				{live?.gameEvent === 'volleyball' && (
					<Box style={{ marginBottom: 20 }}>
						<ButtonGroup
							color="secondary"
							variant="contained"
							aria-label="contained primary button group"
						>
							{sets?.sets?.map((set, index) => (
								<Button onClick={() => getSet(index + 1)}>
									Set {index + 1}
								</Button>
							))}
						</ButtonGroup>
					</Box>
				)}
				{live?.gameEvent === 'volleyball' && (
					<Grid container direction="column">
						<Grid item>
							<Typography>
								Winner of set {set?.no} is {set?.won}
							</Typography>
						</Grid>
						<Grid item>
							<TabPanel value={tab} index={0}>
								<Typography variant="subtitle1" component="strong">
									Stats of Set {set?.no}
								</Typography>
								<StatsTable
									gameEvent={live.gameEvent}
									players={teamOneVolleyballPlayers}
								/>
							</TabPanel>
						</Grid>
						<Grid item>
							<TabPanel value={tab} index={1}>
								<Typography variant="subtitle1" component="strong">
									Stats of Set {set?.no}
								</Typography>
								<StatsTable
									gameEvent={live.gameEvent}
									players={teamTwoVolleyballPlayers}
								/>
							</TabPanel>
						</Grid>
					</Grid>
				)}
			</Container>
		</>
	);
};

export default Scoreboard;
