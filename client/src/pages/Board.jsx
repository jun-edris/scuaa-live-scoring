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
} from '@material-ui/core';
import ScoreTable from '../components/ScoreTable';
import { useParams } from 'react-router-dom';
import { FetchContext } from '../context/FetchContext';
import { AuthContext } from '../context/AuthContext';
import SubtituteTable from '../components/SubtituteTable';

const useStyles = makeStyles({
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
	scoreboard: {
		background: 'rgba(255, 255, 255, 0.87)',
	},
	tab: {
		marginLeft: 'auto',
	},
});

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

const Board = () => {
    const classes = useStyles();
	const [tab, setTabs] = useState(0);
	const [live, setLive] = useState({});
	const fetchContext = useContext(FetchContext);
	const authContext = useContext(AuthContext);

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

	return (
        <>
			<div className={classes.backGround}></div>
			<Container maxWidth="md">
				<Box pt={4}>
					<Grid container direction="column" spacing={4}>
						<Grid item>
							<Paper variant="outlined" className={classes.scoreboard}>
								<Container maxWidth="sm">
									<Box my={2}>
										<Grid
											container
											direction="column"
											justifyContent="space-evenly"
											spacing={4}
										>
											<Grid item>
												<Typography variant="h5" component="h2" align="center">
													{live?.gameEvent}
												</Typography>
											</Grid>
											<Grid item>
												<Grid
													container
													justifyContent="space-between"
													alignItems="center"
												>
													<Grid item>
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
														</Grid>
													</Grid>
													<Grid item>
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
														</Grid>
													</Grid>
												</Grid>
											</Grid>
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
									<Typography
										variant="subtitle1"
										component="strong"
										style={{ color: 'white' }}
									>
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
									<Typography
										variant="subtitle1"
										component="strong"
										style={{ color: 'white' }}
									>
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
									<Typography
										variant="subtitle1"
										component="strong"
										style={{ color: 'white' }}
									>
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
									<Typography
										variant="subtitle1"
										component="strong"
										style={{ color: 'white' }}
									>
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

export default Board;
