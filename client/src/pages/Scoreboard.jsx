import React, { useState } from 'react';
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

const Scoreboard = () => {
	const classes = useStyles();
	const [tab, setTabs] = useState(0);

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
													Basketball
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
																	Balilihan
																</Typography>
															</Grid>
															<Grid item>
																<Typography variant="h1" component="p">
																	7
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
																	Calape
																</Typography>
															</Grid>
															<Grid item>
																<Typography variant="h1" component="p">
																	8
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
									<Tab label="Balilihan" />
									<Tab label="Calape" className={classes.tab} />
								</Tabs>
							</Paper>
							<TabPanel value={tab} index={0}>
								<ScoreTable />
							</TabPanel>
							<TabPanel value={tab} index={1}>
								<ScoreTable />
							</TabPanel>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</>
	);
};

export default Scoreboard;
