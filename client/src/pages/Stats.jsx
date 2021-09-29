import React, { useContext, useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import HeaderCarousel from '../components/HeaderCarousel';
import useStyles from './../styles/stats';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import {
	Box,
	Button,
	Container,
	Grid,
	Paper,
	Tab,
	Tabs,
	Typography,
} from '@material-ui/core';
import { FetchContext } from '../context/FetchContext';
import StatsTable from '../components/StatsTable';
import PDFResult from '../components/PDFResult';
import { monthNames } from '../constants/month';
import { AuthContext } from '../context/AuthContext';

const TabPanel = ({ children, value, index }) => {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
		>
			{value === index && <Box pt={3}>{children}</Box>}
		</div>
	);
};

const Stats = () => {
	const classes = useStyles();
	const [tab, setTabs] = useState(0);
	let { matchId } = useParams();
	const [live, setLive] = useState({});
	const fetchContext = useContext(FetchContext);
	const authContext = useContext(AuthContext);

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

	let dateOfTheMatch = new Date(live.date);
	let month = monthNames[dateOfTheMatch.getMonth()];
	let day = dateOfTheMatch.getDate();
	let year = dateOfTheMatch.getFullYear();

	return (
		<>
			<section className={classes.root}>
				<div className={classes.full__slider}>
					<HeaderCarousel />
				</div>
			</section>
			{live.user === authContext.authState.userInfo._id && (
				<Box my={4}>
					<Container>
						<Button variant="contained" color="primary">
							<PDFDownloadLink
								document={<PDFResult data={live} />}
								fileName={`${live.teamOne?.teamName}_vs_${live.teamTwo?.teamName}-${month}-${day}-${year}.pdf`}
							>
								{({ blob, url, loading, error }) =>
									loading ? 'Loading document...' : 'Download PDF Result!'
								}
							</PDFDownloadLink>
						</Button>
					</Container>
				</Box>
			)}

			<section className={classes.mainDetail}>
				<Box mb={4}>
					<Grid
						container
						direction="column"
						justifyContent="center"
						alignItems="center"
					>
						<Grid item>
							<Box mt={2}>
								<Typography
									variant="button"
									component="span"
									gutterBottom
									display="block"
									className={classes.textColor}
								>
									final
								</Typography>
							</Box>
						</Grid>
					</Grid>
					<Container maxWidth="md">
						<Grid container justifyContent="space-between" alignItems="center">
							<Grid item>
								<Grid container alignItems="center">
									<Grid item>
										<Grid
											container
											alignItems="center"
											className={classes.teamDiv}
										>
											<Grid item className={classes.teamName}>
												<Typography variant="h6" className={classes.textColor}>
													{live.teamOne?.teamName}
												</Typography>
											</Grid>
											<Grid item className={classes.teamImg}>
												<img
													src={`/images/${live?.teamOne?.image}`}
													className={classes.image}
													alt="team logo"
												/>
											</Grid>
										</Grid>
									</Grid>

									<Grid item>
										<Typography
											className={(classes.scores, classes.textColor)}
											variant="h3"
											component="span"
										>
											{teamOneScore}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item>
								<Grid container alignItems="center">
									<Grid item>
										<Typography
											className={(classes.scores, classes.textColor)}
											variant="h3"
											component="span"
										>
											{teamTwoScore}
										</Typography>
									</Grid>
									<Grid item>
										<Grid
											container
											alignItems="center"
											className={classes.teamDiv}
										>
											<Grid item>
												<img
													src={`/images/${live?.teamTwo?.image}`}
													className={classes.image}
													alt="team logo"
												/>
											</Grid>
											<Grid item className={classes.textColor}>
												<Typography variant="h6">
													{live.teamOne?.teamName}
												</Typography>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Container>
				</Box>
			</section>
			<Box mt={4} mb={7}>
				<Grid
					container
					direction="column"
					justifyContent="center"
					alignItems="center"
				>
					<Grid item>
						<Paper>
							<Tabs
								value={tab}
								onChange={handleChange}
								indicatorColor="primary"
								textColor="primary"
							>
								<Tab label={live?.teamOne?.teamName} />
								<Tab label={live?.teamTwo?.teamName} />
							</Tabs>
						</Paper>
					</Grid>
				</Grid>
				<Container>
					<TabPanel value={tab} index={0}>
						<StatsTable gameEvent={live.gameEvent} players={teamOnePlayers} />
					</TabPanel>
					<TabPanel value={tab} index={1}>
						<StatsTable gameEvent={live.gameEvent} players={teamTwoPlayers} />
					</TabPanel>
				</Container>
			</Box>
			<Footer />
		</>
	);
};

export default Stats;
