import React, { useContext, useState } from 'react';
import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
	Button,
	Grid,
	CircularProgress,
	makeStyles,
} from '@material-ui/core';
import { FetchContext } from '../context/FetchContext';
import { AuthContext } from '../context/AuthContext';

const useStyles = makeStyles({
	tableContainer: {
		height: '90%',
		'&::-webkit-scrollbar': {
			width: '0.4em',
		},
		'&::-webkit-scrollbar-track': {
			'-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: 'rgba(255,255,255,.01)',
			borderRadius: '20px',
		},
		overflow: 'scroll',
		width: '250px !important',
	},
	table: {
		width: '100%',
		height: '100%',
		maxHeight: 500,
	},
});

const ScoreTable = ({
	matchId,
	gameEvent,
	players,
	user,
	startTime,
	timeGiven,
	score,
	scoreOpponent,
	setN,
	numSet,
}) => {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const fetchContext = useContext(FetchContext);
	const authContext = useContext(AuthContext);

	let sub = true;
	let point = 0;
	let foul = 0;

	const subPlayer = async (subtituted, currentPlayer) => {
		try {
			setLoading(true);
			const subtitute = {
				subtituted: subtituted,
				matchId: matchId,
			};
			const { data } = await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/sub-player-team-one/${currentPlayer}`,
				subtitute
			);
			console.log(data.message);
			setLoading(false);
		} catch (error) {
			const { data } = error.response;
			console.log(data.message);
			setLoading(false);
		}
	};

	const addScore = async (score, currentPlayer) => {
		try {
			setLoading(true);
			const subtitute = {
				score: score,
				matchId: matchId,
			};
			const { data } = await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/score/${currentPlayer}`,
				subtitute
			);
			console.log(data.message);
			setLoading(false);
		} catch (error) {
			const { data } = error.response;
			console.log(data.message);
			setLoading(false);
		}
	};

	const addBlock = async (score, currentPlayer) => {
		try {
			setLoading(true);
			const subtitute = {
				score: score,
				matchId: matchId,
			};
			const { data } = await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/block/${currentPlayer}`,
				subtitute
			);
			console.log(data.message);
			setLoading(false);
		} catch (error) {
			const { data } = error.response;
			console.log(data.message);
			setLoading(false);
		}
	};

	// BASKETBALL
	const addSteal = async (score, currentPlayer) => {
		try {
			setLoading(true);
			const subtitute = {
				score: score,
				matchId: matchId,
			};
			const { data } = await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/steal/${currentPlayer}`,
				subtitute
			);
			console.log(data.message);
			setLoading(false);
		} catch (error) {
			const { data } = error.response;
			console.log(data.message);
			setLoading(false);
		}
	};

	const addRebound = async (score, currentPlayer) => {
		try {
			setLoading(true);
			const subtitute = {
				score: score,
				matchId: matchId,
			};
			const { data } = await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/rebound/${currentPlayer}`,
				subtitute
			);
			console.log(data.message);
			setLoading(false);
		} catch (error) {
			const { data } = error.response;
			console.log(data.message);
			setLoading(false);
		}
	};

	const addAssist = async (score, currentPlayer) => {
		try {
			setLoading(true);
			const subtitute = {
				score: score,
				matchId: matchId,
			};
			const { data } = await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/assist/${currentPlayer}`,
				subtitute
			);
			console.log(data.message);
			setLoading(false);
		} catch (error) {
			const { data } = error.response;
			console.log(data.message);
			setLoading(false);
		}
	};

	// VOLLEYBALL
	const addSpike = async (score, currentPlayer) => {
		try {
			setLoading(true);
			const subtitute = {
				score: score,
				matchId: matchId,
			};
			const { data } = await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/spike/${currentPlayer}`,
				subtitute
			);
			console.log(data.message);
			setLoading(false);
		} catch (error) {
			const { data } = error.response;
			console.log(data.message);
			setLoading(false);
		}
	};

	const addDig = async (score, currentPlayer) => {
		try {
			setLoading(true);
			const subtitute = {
				score: score,
				matchId: matchId,
			};
			const { data } = await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/dig/${currentPlayer}`,
				subtitute
			);
			console.log(data.message);
			setLoading(false);
		} catch (error) {
			const { data } = error.response;
			console.log(data.message);
			setLoading(false);
		}
	};

	const addSaveBall = async (score, currentPlayer) => {
		try {
			setLoading(true);
			const subtitute = {
				score: score,
				matchId: matchId,
			};
			const { data } = await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/save-ball/${currentPlayer}`,
				subtitute
			);
			console.log(data.message);
			setLoading(false);
		} catch (error) {
			const { data } = error.response;
			console.log(data.message);
			setLoading(false);
		}
	};

	const addAce = async (score, currentPlayer) => {
		try {
			setLoading(true);
			const subtitute = {
				score: score,
				matchId: matchId,
			};
			const { data } = await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/ace/${currentPlayer}`,
				subtitute
			);
			console.log(data.message);
			setLoading(false);
		} catch (error) {
			const { data } = error.response;
			console.log(data.message);
			setLoading(false);
		}
	};

	const addFoul = async (foul, currentPlayer) => {
		try {
			setLoading(true);
			const subtitute = {
				foul: foul,
				matchId: matchId,
			};
			const { data } = await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/foul/${currentPlayer}`,
				subtitute
			);
			console.log(data.message);
			setLoading(false);
		} catch (error) {
			const { data } = error.response;
			console.log(data.message);
			setLoading(false);
		}
	};

	const addYellowCard = async (foul, currentPlayer) => {
		try {
			setLoading(true);
			const subtitute = {
				foul: foul,
				matchId: matchId,
			};
			const { data } = await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/add-yellow-card/${currentPlayer}`,
				subtitute
			);
			console.log(data.message);
			setLoading(false);
		} catch (error) {
			const { data } = error.response;
			console.log(data.message);
			setLoading(false);
		}
	};

	const addRedCard = async (foul, currentPlayer) => {
		try {
			setLoading(true);
			const subtitute = {
				foul: foul,
				matchId: matchId,
			};
			const { data } = await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/add-red-card/${currentPlayer}`,
				subtitute
			);
			console.log(data.message);
			setLoading(false);
		} catch (error) {
			const { data } = error.response;
			console.log(data.message);
			setLoading(false);
		}
	};

	const decScore = async (score, currentPlayer) => {
		try {
			setLoading(true);
			const subtitute = {
				score: score,
				matchId: matchId,
			};
			const { data } = await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/dec-score/${currentPlayer}`,
				subtitute
			);
			console.log(data.message);
			setLoading(false);
		} catch (error) {
			const { data } = error.response;
			console.log(data.message);
			setLoading(false);
		}
	};

	const decBlock = async (score, currentPlayer) => {
		try {
			setLoading(true);
			const subtitute = {
				score: score,
				matchId: matchId,
			};
			const { data } = await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/dec-block/${currentPlayer}`,
				subtitute
			);
			console.log(data.message);
			setLoading(false);
		} catch (error) {
			const { data } = error.response;
			console.log(data.message);
			setLoading(false);
		}
	};

	// BASKETBALL
	const decSteal = async (score, currentPlayer) => {
		try {
			setLoading(true);
			const subtitute = {
				score: score,
				matchId: matchId,
			};
			const { data } = await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/dec-steal/${currentPlayer}`,
				subtitute
			);
			console.log(data.message);
			setLoading(false);
		} catch (error) {
			const { data } = error.response;
			console.log(data.message);
			setLoading(false);
		}
	};

	const decRebound = async (score, currentPlayer) => {
		try {
			setLoading(true);
			const subtitute = {
				score: score,
				matchId: matchId,
			};
			const { data } = await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/dec-rebound/${currentPlayer}`,
				subtitute
			);
			console.log(data.message);
			setLoading(false);
		} catch (error) {
			const { data } = error.response;
			console.log(data.message);
			setLoading(false);
		}
	};

	const decAssist = async (score, currentPlayer) => {
		try {
			setLoading(true);
			const subtitute = {
				score: score,
				matchId: matchId,
			};
			const { data } = await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/dec-assist/${currentPlayer}`,
				subtitute
			);
			console.log(data.message);
			setLoading(false);
		} catch (error) {
			const { data } = error.response;
			console.log(data.message);
			setLoading(false);
		}
	};

	// VOLLEYBALL
	const decSpike = async (score, currentPlayer) => {
		try {
			setLoading(true);
			const subtitute = {
				score: score,
				matchId: matchId,
			};
			const { data } = await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/dec-spike/${currentPlayer}`,
				subtitute
			);
			console.log(data.message);
			setLoading(false);
		} catch (error) {
			const { data } = error.response;
			console.log(data.message);
			setLoading(false);
		}
	};

	const decDig = async (score, currentPlayer) => {
		try {
			setLoading(true);
			const subtitute = {
				score: score,
				matchId: matchId,
			};
			const { data } = await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/dec-dig/${currentPlayer}`,
				subtitute
			);
			console.log(data.message);
			setLoading(false);
		} catch (error) {
			const { data } = error.response;
			console.log(data.message);
			setLoading(false);
		}
	};

	const decSaveBall = async (score, currentPlayer) => {
		try {
			setLoading(true);
			const subtitute = {
				score: score,
				matchId: matchId,
			};
			const { data } = await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/dec-save-ball/${currentPlayer}`,
				subtitute
			);
			console.log(data.message);
			setLoading(false);
		} catch (error) {
			const { data } = error.response;
			console.log(data.message);
			setLoading(false);
		}
	};

	const decAce = async (score, currentPlayer) => {
		try {
			setLoading(true);
			const subtitute = {
				score: score,
				matchId: matchId,
			};
			const { data } = await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/dec-ace/${currentPlayer}`,
				subtitute
			);
			console.log(data.message);
			setLoading(false);
		} catch (error) {
			const { data } = error.response;
			console.log(data.message);
			setLoading(false);
		}
	};

	const decFoul = async (foul, currentPlayer) => {
		try {
			setLoading(true);
			const subtitute = {
				foul: foul,
				matchId: matchId,
			};
			const { data } = await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/dec-foul/${currentPlayer}`,
				subtitute
			);
			console.log(data.message);
			setLoading(false);
		} catch (error) {
			const { data } = error.response;
			console.log(data.message);
			setLoading(false);
		}
	};

	const decYellowCard = async (foul, currentPlayer) => {
		try {
			setLoading(true);
			const subtitute = {
				foul: foul,
				matchId: matchId,
			};
			const { data } = await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/dec-yellow-card/${currentPlayer}`,
				subtitute
			);
			console.log(data.message);
			setLoading(false);
		} catch (error) {
			const { data } = error.response;
			console.log(data.message);
			setLoading(false);
		}
	};

	// const decRedCard = async (foul, currentPlayer) => {
	// 	try {
	// 		setLoading(true);
	// 		const subtitute = {
	// 			foul: foul,
	// 			matchId: matchId,
	// 		};
	// 		const { data } = await fetchContext.authAxios.patch(
	// 			`/${authContext.authState.userInfo.role}/dec-red-card/${currentPlayer}`,
	// 			subtitute
	// 		);
	// 		console.log(data.message);
	// 		setLoading(false);
	// 	} catch (error) {
	// 		const { data } = error.response;
	// 		console.log(data.message);
	// 		setLoading(false);
	// 	}
	// };

	return (
		<>
			<TableContainer component={Paper}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell align="left">Jersey No.</TableCell>
							<TableCell align="left">Player Name</TableCell>
							<TableCell align="center">Scores</TableCell>

							{user === authContext.authState.userInfo._id && (
								<TableCell align="center">Add Scores</TableCell>
							)}
							{gameEvent === 'basketball' && (
								<>
									<TableCell align="center">Assists</TableCell>
									{user === authContext.authState.userInfo._id && (
										<>
											<TableCell align="center">Add Assists</TableCell>
										</>
									)}
									<TableCell align="center">Rebounds</TableCell>
									{user === authContext.authState.userInfo._id && (
										<>
											<TableCell align="center">Add Rebounds</TableCell>
										</>
									)}
									<TableCell align="center">Steals</TableCell>
									{user === authContext.authState.userInfo._id && (
										<>
											<TableCell align="center">Add Steals</TableCell>
										</>
									)}
									<TableCell align="center">Block</TableCell>
									{user === authContext.authState.userInfo._id && (
										<>
											<TableCell align="center">Add Block</TableCell>
										</>
									)}
								</>
							)}

							{gameEvent === 'volleyball' && (
								<>
									<TableCell align="center">Ace</TableCell>
									{user === authContext.authState.userInfo._id && (
										<TableCell align="center">Add Ace</TableCell>
									)}
									<TableCell align="center">Spike</TableCell>
									{user === authContext.authState.userInfo._id && (
										<TableCell align="center">Add Spike</TableCell>
									)}
									<TableCell align="center">Digs</TableCell>
									{user === authContext.authState.userInfo._id && (
										<TableCell align="center">Add Digs</TableCell>
									)}
									<TableCell align="center">Save Ball</TableCell>
									{user === authContext.authState.userInfo._id && (
										<TableCell align="center">Add Save Ball</TableCell>
									)}
									<TableCell align="center">Block</TableCell>
									{user === authContext.authState.userInfo._id && (
										<TableCell align="center">Add Block</TableCell>
									)}
								</>
							)}

							{gameEvent === 'basketball' && (
								<>
									<TableCell align="center">Fouls</TableCell>
									{user === authContext.authState.userInfo._id && (
										<>
											<TableCell align="center">Add Fouls</TableCell>
										</>
									)}
								</>
							)}

							{gameEvent === 'soccer' && (
								<>
									<TableCell align="left">Yellow Cards</TableCell>
								</>
							)}

							{gameEvent === 'soccer' && (
								<>
									<TableCell align="left">Add Yellow Card</TableCell>
								</>
							)}

							{gameEvent === 'soccer' && (
								<>
									<TableCell align="left">Red Cards</TableCell>
								</>
							)}

							{gameEvent === 'soccer' &&
								user === authContext.authState.userInfo._id && (
									<>
										<TableCell align="left">Add Red Card</TableCell>
									</>
								)}
							{user === authContext.authState.userInfo._id && (
								<TableCell align="left">Subtitute</TableCell>
							)}
						</TableRow>
					</TableHead>
					<TableBody>
						{players?.map((player, index) => (
							<TableRow
								hover={
									user === authContext.authState.userInfo._id ? true : false
								}
								key={index}
							>
								<TableCell align="left">{player?.jerseyNumber}</TableCell>
								<TableCell align="left">{player?.name}</TableCell>
								<TableCell align="center">{player?.scores}</TableCell>
								{gameEvent === 'basketball' && (
									<>
										{user === authContext.authState.userInfo._id && (
											<TableCell>
												<Grid container direction="row" spacing={2}>
													<Grid item>
														<Grid container direction="row" spacing={2}>
															<Grid item>
																<Button
																	variant="contained"
																	color="secondary"
																	size="small"
																	disabled={
																		loading === true ||
																		players.length < 5 ||
																		startTime === false ||
																		timeGiven === 0
																	}
																	onClick={() => {
																		point++;
																		const currentPlayer = player?._id;

																		addScore(point, currentPlayer);
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
																	+ 1
																</Button>
															</Grid>
															<Grid item>
																<Button
																	variant="contained"
																	color="secondary"
																	size="small"
																	disabled={
																		loading === true ||
																		players.length < 5 ||
																		startTime === false ||
																		timeGiven === 0
																	}
																	onClick={() => {
																		point += 2;
																		const currentPlayer = player._id;

																		addScore(point, currentPlayer);
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
																	+ 2
																</Button>
															</Grid>
															<Grid item>
																<Button
																	variant="contained"
																	color="secondary"
																	size="small"
																	disabled={
																		loading === true ||
																		players.length < 5 ||
																		startTime === false ||
																		timeGiven === 0
																	}
																	onClick={() => {
																		point += 3;
																		const currentPlayer = player._id;

																		addScore(point, currentPlayer);
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
																	+ 3
																</Button>
															</Grid>
														</Grid>
													</Grid>
													<Grid item>
														<Button
															variant="contained"
															style={{ backgroundColor: 'red' }}
															size="small"
															disabled={
																loading === true ||
																player?.scores === 0 ||
																players.length < 5 ||
																startTime === false ||
																timeGiven === 0
															}
															onClick={() => {
																point++;
																const currentPlayer = player?._id;

																decScore(point, currentPlayer);
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
															- 1
														</Button>
													</Grid>
												</Grid>
											</TableCell>
										)}
										<TableCell align="center">{player?.assists}</TableCell>
										{user === authContext.authState.userInfo._id && (
											<TableCell align="left">
												<Grid container direction="column" spacing={2}>
													<Grid item>
														<Button
															variant="contained"
															color="secondary"
															size="small"
															disabled={
																loading === true ||
																players.length < 5 ||
																startTime === false ||
																timeGiven === 0
															}
															onClick={() => {
																point++;
																const currentPlayer = player?._id;

																addAssist(point, currentPlayer);
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
															+ 1
														</Button>
													</Grid>
													<Grid item>
														<Button
															variant="contained"
															style={{ backgroundColor: 'red' }}
															size="small"
															disabled={
																loading === true ||
																player?.assists === 0 ||
																players.length < 5 ||
																startTime === false ||
																timeGiven === 0
															}
															onClick={() => {
																point++;
																const currentPlayer = player?._id;

																decAssist(point, currentPlayer);
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
															- 1
														</Button>
													</Grid>
												</Grid>
											</TableCell>
										)}
										<TableCell align="center">{player?.rebounds}</TableCell>
										{user === authContext.authState.userInfo._id && (
											<TableCell align="left">
												<Grid container direction="column" spacing={2}>
													<Grid item>
														<Button
															variant="contained"
															color="secondary"
															size="small"
															disabled={
																loading === true ||
																players.length < 5 ||
																startTime === false ||
																timeGiven === 0
															}
															onClick={() => {
																point++;
																const currentPlayer = player?._id;

																addRebound(point, currentPlayer);
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
															+ 1
														</Button>
													</Grid>
													<Grid item>
														<Button
															variant="contained"
															style={{ backgroundColor: 'red' }}
															size="small"
															disabled={
																loading === true ||
																player?.rebounds === 0 ||
																players.length < 5 ||
																startTime === false ||
																timeGiven === 0
															}
															onClick={() => {
																point++;
																const currentPlayer = player?._id;

																decRebound(point, currentPlayer);
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
															- 1
														</Button>
													</Grid>
												</Grid>
											</TableCell>
										)}
										<TableCell align="center">{player?.steal}</TableCell>
										{user === authContext.authState.userInfo._id && (
											<TableCell align="left">
												<Grid container direction="column" spacing={2}>
													<Grid item>
														<Button
															variant="contained"
															color="secondary"
															size="small"
															disabled={
																loading === true ||
																players.length < 5 ||
																startTime === false ||
																timeGiven === 0
															}
															onClick={() => {
																point++;
																const currentPlayer = player?._id;

																addSteal(point, currentPlayer);
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
															+ 1
														</Button>
													</Grid>
													<Grid item>
														<Button
															variant="contained"
															style={{ backgroundColor: 'red' }}
															size="small"
															disabled={
																loading === true ||
																player?.steal === 0 ||
																players.length < 5 ||
																startTime === false ||
																timeGiven === 0
															}
															onClick={() => {
																point++;
																const currentPlayer = player?._id;

																decSteal(point, currentPlayer);
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
															- 1
														</Button>
													</Grid>
												</Grid>
											</TableCell>
										)}
									</>
								)}
								{gameEvent === 'volleyball' && (
									<>
										{user === authContext.authState.userInfo._id && (
											<TableCell align="left">
												<Grid container direction="column" spacing={2}>
													<Grid item>
														<Button
															variant="contained"
															color="secondary"
															size="small"
															disabled={
																loading === true ||
																players.length < 6 ||
																startTime === false ||
																((setN === 'First Set' ||
																	setN === 'Second Set') &&
																	score >= 25 &&
																	score - scoreOpponent >= 2) ||
																(score === 25 && score - scoreOpponent > 1) ||
																(scoreOpponent === 25 &&
																	scoreOpponent - score > 1) ||
																((setN === 'First Set' ||
																	setN === 'Second Set') &&
																	scoreOpponent >= 25 &&
																	scoreOpponent - score >= 2) ||
																(score === 25 && score - scoreOpponent > 1) ||
																(scoreOpponent === 25 &&
																	scoreOpponent - score > 1)
																// ||
																// (numSet === 3 &&
																// 	setN === 'Third Set' &&
																// 	(score >= 15 ||
																// 		score - scoreOpponent >= 2)) ||
																// (scoreOpponent >= 15 &&
																// 	scoreOpponent - score >= 2) ||
																// (numSet === 5 &&
																// 	setN === 'Fifth Set' &&
																// 	(score >= 15 ||
																// 		score - scoreOpponent >= 2)) ||
																// (scoreOpponent >= 15 &&
																// 	scoreOpponent - score >= 2)
															}
															onClick={() => {
																point++;
																const currentPlayer = player?._id;

																addScore(point, currentPlayer);
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
															+ 1
														</Button>
													</Grid>
													<Grid item>
														<Button
															variant="contained"
															style={{ backgroundColor: 'red' }}
															size="small"
															disabled={
																loading === true ||
																player?.scores === 0 ||
																players.length < 6 ||
																startTime === false
															}
															onClick={() => {
																point++;
																const currentPlayer = player?._id;

																decScore(point, currentPlayer);
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
															- 1
														</Button>
													</Grid>
												</Grid>
											</TableCell>
										)}
										<TableCell align="center">{player?.ace}</TableCell>
										{user === authContext.authState.userInfo._id && (
											<TableCell align="left">
												<Grid container direction="column" spacing={2}>
													<Grid item>
														<Button
															variant="contained"
															color="secondary"
															size="small"
															disabled={
																loading === true ||
																players.length < 6 ||
																startTime === false ||
																((setN === 'First Set' ||
																	setN === 'Second Set') &&
																	score >= 25 &&
																	score - scoreOpponent >= 2) ||
																(score === 25 && score - scoreOpponent > 1) ||
																(scoreOpponent === 25 &&
																	scoreOpponent - score > 1) ||
																((setN === 'First Set' ||
																	setN === 'Second Set') &&
																	scoreOpponent >= 25 &&
																	scoreOpponent - score >= 2) ||
																(score === 25 && score - scoreOpponent > 1) ||
																(scoreOpponent === 25 &&
																	scoreOpponent - score > 1)
															}
															onClick={() => {
																point++;
																const currentPlayer = player?._id;

																addAce(point, currentPlayer);
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
															+ 1
														</Button>
													</Grid>
													<Grid item>
														<Button
															variant="contained"
															style={{ backgroundColor: 'red' }}
															size="small"
															disabled={
																loading === true ||
																player?.ace === 0 ||
																players.length < 6 ||
																startTime === false
															}
															onClick={() => {
																point++;
																const currentPlayer = player?._id;

																decAce(point, currentPlayer);
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
															- 1
														</Button>
													</Grid>
												</Grid>
											</TableCell>
										)}
										<TableCell align="center">{player?.spike}</TableCell>
										{user === authContext.authState.userInfo._id && (
											<TableCell align="left">
												<Grid container direction="column" spacing={2}>
													<Grid item>
														<Button
															variant="contained"
															color="secondary"
															size="small"
															disabled={
																loading === true ||
																players.length < 6 ||
																startTime === false ||
																((setN === 'First Set' ||
																	setN === 'Second Set') &&
																	score >= 25 &&
																	score - scoreOpponent >= 2) ||
																(score === 25 && score - scoreOpponent > 1) ||
																(scoreOpponent === 25 &&
																	scoreOpponent - score > 1) ||
																((setN === 'First Set' ||
																	setN === 'Second Set') &&
																	scoreOpponent >= 25 &&
																	scoreOpponent - score >= 2) ||
																(score === 25 && score - scoreOpponent > 1) ||
																(scoreOpponent === 25 &&
																	scoreOpponent - score > 1)
															}
															onClick={() => {
																point++;
																const currentPlayer = player?._id;

																addSpike(point, currentPlayer);
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
															+ 1
														</Button>
													</Grid>
													<Grid item>
														<Button
															variant="contained"
															style={{ backgroundColor: 'red' }}
															size="small"
															disabled={
																loading === true ||
																player?.spike === 0 ||
																players.length < 6 ||
																startTime === false
															}
															onClick={() => {
																point++;
																const currentPlayer = player?._id;

																decSpike(point, currentPlayer);
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
															- 1
														</Button>
													</Grid>
												</Grid>
											</TableCell>
										)}
										<TableCell align="center">{player?.digs}</TableCell>
										{user === authContext.authState.userInfo._id && (
											<TableCell align="left">
												<Grid container direction="column" spacing={2}>
													<Grid item>
														<Button
															variant="contained"
															color="secondary"
															size="small"
															disabled={
																loading === true ||
																players.length < 6 ||
																startTime === false ||
																((setN === 'First Set' ||
																	setN === 'Second Set') &&
																	score >= 25 &&
																	score - scoreOpponent >= 2) ||
																(score === 25 && score - scoreOpponent > 1) ||
																(scoreOpponent === 25 &&
																	scoreOpponent - score > 1) ||
																((setN === 'First Set' ||
																	setN === 'Second Set') &&
																	scoreOpponent >= 25 &&
																	scoreOpponent - score >= 2) ||
																(score === 25 && score - scoreOpponent > 1) ||
																(scoreOpponent === 25 &&
																	scoreOpponent - score > 1)
															}
															onClick={() => {
																point++;
																const currentPlayer = player?._id;

																addDig(point, currentPlayer);
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
															+ 1
														</Button>
													</Grid>
													<Grid item>
														<Button
															variant="contained"
															style={{ backgroundColor: 'red' }}
															size="small"
															disabled={
																loading === true ||
																player?.digs === 0 ||
																players.length < 6 ||
																startTime === false
															}
															onClick={() => {
																point++;
																const currentPlayer = player?._id;

																decDig(point, currentPlayer);
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
															- 1
														</Button>
													</Grid>
												</Grid>
											</TableCell>
										)}
										<TableCell align="center">{player?.saveBall}</TableCell>
										{user === authContext.authState.userInfo._id && (
											<TableCell align="left">
												<Grid container direction="column" spacing={2}>
													<Grid item>
														<Button
															variant="contained"
															color="secondary"
															size="small"
															disabled={
																loading === true ||
																players.length < 6 ||
																startTime === false ||
																((setN === 'First Set' ||
																	setN === 'Second Set') &&
																	score >= 25 &&
																	score - scoreOpponent >= 2) ||
																(score === 25 && score - scoreOpponent > 1) ||
																(scoreOpponent === 25 &&
																	scoreOpponent - score > 1) ||
																((setN === 'First Set' ||
																	setN === 'Second Set') &&
																	scoreOpponent >= 25 &&
																	scoreOpponent - score >= 2) ||
																(score === 25 && score - scoreOpponent > 1) ||
																(scoreOpponent === 25 &&
																	scoreOpponent - score > 1)
															}
															onClick={() => {
																point++;
																const currentPlayer = player?._id;

																addSaveBall(point, currentPlayer);
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
															+ 1
														</Button>
													</Grid>
													<Grid item>
														<Button
															variant="contained"
															style={{ backgroundColor: 'red' }}
															size="small"
															disabled={
																loading === true ||
																player?.saveBall === 0 ||
																players.length < 6 ||
																startTime === false
															}
															onClick={() => {
																point++;
																const currentPlayer = player?._id;

																decSaveBall(point, currentPlayer);
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
															- 1
														</Button>
													</Grid>
												</Grid>
											</TableCell>
										)}
									</>
								)}
								{(gameEvent === 'basketball' || gameEvent === 'volleyball') && (
									<>
										<TableCell align="center">{player?.block}</TableCell>
										{user === authContext.authState.userInfo._id && (
											<TableCell align="left">
												<Grid container direction="column" spacing={2}>
													<Grid item>
														<Button
															variant="contained"
															color="secondary"
															size="small"
															disabled={
																loading === true ||
																(gameEvent === 'basketball' &&
																	players.length < 5) ||
																timeGiven === 0 ||
																startTime === false ||
																(((setN === 'First Set' ||
																	setN === 'Second Set') &&
																	(score >= 25 &&
																	score - scoreOpponent >= 2)) ||
																(score === 25 && score - scoreOpponent > 1)) ||
																(scoreOpponent === 25 &&
																	scoreOpponent - score > 1) ||
																(((setN === 'First Set' ||
																	setN === 'Second Set') &&
																	(scoreOpponent >= 25 &&
																	scoreOpponent - score >= 2)) ||
																(score === 25 && score - scoreOpponent > 1) ||
																(scoreOpponent === 25 &&
																	scoreOpponent - score > 1))
															}
															onClick={() => {
																point++;
																const currentPlayer = player?._id;

																addBlock(point, currentPlayer);
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
															+ 1
														</Button>
													</Grid>
													<Grid item>
														<Button
															variant="contained"
															style={{ backgroundColor: 'red' }}
															size="small"
															disabled={
																loading === true ||
																player?.block === 0 ||
																(gameEvent === 'basketball' &&
																	players.length < 5) ||
																(gameEvent === 'volleyball' &&
																	players.length < 6)
															}
															onClick={() => {
																point++;
																const currentPlayer = player?._id;

																decBlock(point, currentPlayer);
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
															- 1
														</Button>
													</Grid>
												</Grid>
											</TableCell>
										)}
									</>
								)}
								{gameEvent === 'soccer' &&
									user === authContext.authState.userInfo._id && (
										<TableCell align="left">
											<Grid container direction="column" spacing={2}>
												<Grid item>
													<Button
														variant="contained"
														color="secondary"
														size="small"
														disabled={
															loading === true ||
															players.length < 8 ||
															startTime === false
														}
														onClick={() => {
															point++;
															const currentPlayer = player?._id;

															addScore(point, currentPlayer);
														}}
														startIcon={
															loading === true ? (
																<CircularProgress size={20} color="secondary" />
															) : null
														}
													>
														+ 1 point
													</Button>
												</Grid>
												<Grid item>
													<Button
														variant="contained"
														color="secondary"
														size="small"
														disabled={
															loading === true ||
															players.length < 8 ||
															startTime === false ||
															player?.scores === 0
														}
														onClick={() => {
															point++;
															const currentPlayer = player?._id;

															decScore(point, currentPlayer);
														}}
														startIcon={
															loading === true ? (
																<CircularProgress size={20} color="secondary" />
															) : null
														}
													>
														- 1 point
													</Button>
												</Grid>
											</Grid>
										</TableCell>
									)}
								{gameEvent === 'basketball' && (
									<>
										<TableCell align="center">{player?.fouls}</TableCell>
										{user === authContext.authState.userInfo._id && (
											<TableCell align="left">
												<Grid container direction="column" spacing={2}>
													<Grid item>
														<Button
															variant="contained"
															color="primary"
															size="small"
															fullWidth
															disabled={
																player?.fouls === 5 ||
																loading === true ||
																players.length < 5 ||
																startTime === false ||
																timeGiven === 0
															}
															startIcon={
																loading === true ? (
																	<CircularProgress
																		size={20}
																		color="secondary"
																	/>
																) : null
															}
															onClick={() => {
																if (player?.fouls === 4) {
																	foul++;
																	sub = false;
																	const currentPlayer = player._id;
																	addFoul(foul, currentPlayer);
																	subPlayer(sub, currentPlayer);
																}
																foul++;
																const currentPlayer = player._id;
																addFoul(foul, currentPlayer);
															}}
														>
															+ 1
														</Button>
													</Grid>
													<Grid item>
														<Button
															variant="contained"
															color="primary"
															size="small"
															fullWidth
															disabled={
																player?.fouls === 0 ||
																loading === true ||
																players.length < 5
															}
															startIcon={
																loading === true ? (
																	<CircularProgress
																		size={20}
																		color="secondary"
																	/>
																) : null
															}
															onClick={() => {
																foul++;
																const currentPlayer = player._id;
																decFoul(foul, currentPlayer);
															}}
														>
															- 1
														</Button>
													</Grid>
												</Grid>
											</TableCell>
										)}
									</>
								)}
								{gameEvent === 'soccer' && (
									<>
										<TableCell align="left">{player?.card?.yellow}</TableCell>
										{user === authContext.authState.userInfo._id && (
											<TableCell align="left">
												<Grid container direction="column" spacing={2}>
													<Grid item>
														<Button
															variant="contained"
															style={{
																backgroundColor: 'yellow',
															}}
															disabled={
																(loading === true && players.length < 8) ||
																startTime === false ||
																player?.card?.yellow === 2 ||
																player?.card?.red === 1
															}
															size="small"
															fullWidth
															onClick={() => {
																if (player?.card.yellow === 1) {
																	foul++;
																	sub = false;
																	const currentPlayer = player._id;
																	addYellowCard(foul, currentPlayer);
																	subPlayer(sub, currentPlayer);
																}
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
															+ 1
														</Button>
													</Grid>
													<Grid item>
														<Button
															variant="contained"
															style={{
																backgroundColor: 'yellow',
															}}
															disabled={
																loading === true ||
																players.length < 8 ||
																startTime === false ||
																player?.card?.yellow === 0
															}
															size="small"
															fullWidth
															onClick={() => {
																foul++;
																const currentPlayer = player._id;
																decYellowCard(foul, currentPlayer);
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
															- 1
														</Button>
													</Grid>
												</Grid>
											</TableCell>
										)}
										<TableCell align="left">{player?.card?.red}</TableCell>
										{user === authContext.authState.userInfo._id && (
											<TableCell align="left">
												<Button
													variant="contained"
													style={{
														backgroundColor: 'red',
													}}
													color="primary"
													size="small"
													fullWidth
													disabled={
														loading === true ||
														players.length < 8 ||
														startTime === false ||
														player?.card?.yellow === 2 ||
														player?.card?.red === 1
													}
													onClick={() => {
														if (player?.card.red === 0) {
															foul++;
															sub = false;
															const currentPlayer = player._id;
															addRedCard(foul, currentPlayer);
															subPlayer(sub, currentPlayer);
														}
													}}
													startIcon={
														loading === true ? (
															<CircularProgress size={20} color="secondary" />
														) : null
													}
												>
													+ 1
												</Button>
											</TableCell>
										)}
									</>
								)}

								{user === authContext.authState.userInfo._id && (
									<TableCell>
										<Grid container>
											<Grid item>
												<Button
													variant="contained"
													color="primary"
													size="small"
													fullWidth
													disabled={loading === true}
													onClick={() => {
														sub = false;
														const currentPlayer = player._id;
														subPlayer(sub, currentPlayer);
													}}
													startIcon={
														loading === true ? (
															<CircularProgress size={20} color="secondary" />
														) : null
													}
												>
													OUT
												</Button>
											</Grid>
										</Grid>
									</TableCell>
								)}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default ScoreTable;
