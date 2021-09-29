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
		position: 'relative',
		overflowX: 'scroll',
		minWidth: 320,
	},
});

const ScoreTable = ({ matchId, gameEvent, players, user }) => {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const fetchContext = useContext(FetchContext);
	const authContext = useContext(AuthContext);

	let sub = true;
	let score = 0;
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

	const addRedCard = async (foul, currentPlayer) => {
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

	return (
		<>
			<Paper>
				<TableContainer className={classes.tableContainer}>
					<Table
						stickyHeader
						size="small"
						sx={{ overflowX: 'scroll', minWidth: 320 }}
					>
						<TableHead sx={{ overflowX: 'scroll', minWidth: 320 }}>
							<TableRow>
								<TableCell align="left">Jersey No.</TableCell>
								<TableCell align="left">Player Name</TableCell>
								<TableCell align="center">Scores</TableCell>

								{user === authContext.authState.userInfo._id && (
									<TableCell align="center">Add Scores</TableCell>
								)}

								{gameEvent === 'basketball' && (
									<>
										<TableCell align="center">Fouls</TableCell>
									</>
								)}

								{gameEvent === 'basketball' &&
									user === authContext.authState.userInfo._id && (
										<>
											<TableCell align="center">Add Fouls</TableCell>
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
						<TableBody sx={{ overflowX: 'scroll', minWidth: 320 }}>
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
									{gameEvent === 'basketball' &&
										user === authContext.authState.userInfo._id && (
											<TableCell>
												<Grid container direction="row" spacing={2}>
													<Grid item xs={12} md>
														<Button
															variant="contained"
															color="secondary"
															size="small"
															disabled={loading === true}
															onClick={() => {
																score++;
																const currentPlayer = player?._id;

																addScore(score, currentPlayer);
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
															1 point
														</Button>
													</Grid>
													<Grid item xs={12} md>
														<Button
															variant="contained"
															color="secondary"
															size="small"
															disabled={loading === true}
															onClick={() => {
																score += 2;
																const currentPlayer = player._id;

																addScore(score, currentPlayer);
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
															2 points
														</Button>
													</Grid>
													<Grid item xs={12} md>
														<Button
															variant="contained"
															color="secondary"
															size="small"
															disabled={loading === true}
															onClick={() => {
																score += 3;
																const currentPlayer = player._id;

																addScore(score, currentPlayer);
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
															3 points
														</Button>
													</Grid>
												</Grid>
											</TableCell>
										)}
									{gameEvent === 'volleyball' &&
										user === authContext.authState.userInfo._id && (
											<TableCell align="left">
												<Button
													variant="contained"
													color="secondary"
													size="small"
													disabled={loading === true}
													onClick={() => {
														score++;
														const currentPlayer = player?._id;

														addScore(score, currentPlayer);
													}}
													startIcon={
														loading === true ? (
															<CircularProgress size={20} color="secondary" />
														) : null
													}
												>
													1 point
												</Button>
											</TableCell>
										)}
									{gameEvent === 'soccer' &&
										user === authContext.authState.userInfo._id && (
											<TableCell align="left">
												<TableCell align="left">
													<Button
														variant="contained"
														color="secondary"
														size="small"
														disabled={loading === true}
														onClick={() => {
															score++;
															const currentPlayer = player?._id;

															addScore(score, currentPlayer);
														}}
														startIcon={
															loading === true ? (
																<CircularProgress size={20} color="secondary" />
															) : null
														}
													>
														1 point
													</Button>
												</TableCell>
											</TableCell>
										)}
									{gameEvent === 'basketball' && (
										<>
											<TableCell align="center">{player?.fouls}</TableCell>
										</>
									)}
									{gameEvent === 'basketball' &&
										user === authContext.authState.userInfo._id && (
											<>
												<TableCell align="left">
													<Button
														variant="contained"
														color="primary"
														size="small"
														fullWidth
														disabled={loading === true && player?.fouls === 6}
														startIcon={
															loading === true ? (
																<CircularProgress size={20} color="secondary" />
															) : null
														}
														onClick={() => {
															foul++;
															const currentPlayer = player._id;
															addFoul(foul, currentPlayer);
														}}
													>
														ADD FOULS
													</Button>
												</TableCell>
											</>
										)}
									{gameEvent === 'soccer' && (
										<>
											<TableCell align="left">{player?.card?.yellow}</TableCell>
										</>
									)}
									{gameEvent === 'soccer' &&
										user === authContext.authState.userInfo._id && (
											<>
												<TableCell align="left">
													<Button
														variant="contained"
														style={{
															backgroundColor: 'yellow',
															color: 'black',
														}}
														disabled={
															loading === true &&
															(player?.card?.yellow === 2 ||
																player?.card?.red === 1)
														}
														size="small"
														fullWidth
														onClick={() => {
															foul++;
															const currentPlayer = player._id;
															addYellowCard(foul, currentPlayer);
														}}
														startIcon={
															loading === true ? (
																<CircularProgress size={20} color="secondary" />
															) : null
														}
													>
														ADD YELLOW CARD
													</Button>
												</TableCell>
											</>
										)}
									{gameEvent === 'soccer' && (
										<>
											<TableCell align="left">{player?.card?.red}</TableCell>
										</>
									)}
									{gameEvent === 'soccer' &&
										user === authContext.authState.userInfo._id && (
											<>
												<TableCell align="left">
													<Button
														variant="contained"
														color="primary"
														size="small"
														fullWidth
														disabled={
															loading === true &&
															(player?.card?.yellow === 2 ||
																player?.card?.red === 1)
														}
														onClick={() => {
															foul++;
															const currentPlayer = player._id;
															addRedCard(foul, currentPlayer);
														}}
														startIcon={
															loading === true ? (
																<CircularProgress size={20} color="secondary" />
															) : null
														}
													>
														ADD RED CARD
													</Button>
												</TableCell>
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
			</Paper>
		</>
	);
};

export default ScoreTable;
