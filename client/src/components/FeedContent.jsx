import {
	Avatar,
	Box,
	Card,
	CardContent,
	Divider,
	Grid,
	Typography,
} from '@material-ui/core';
import CustomButton from './common/CustomButton';
import useStyles from './../styles/feedContent';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { useHistory } from 'react-router-dom';

const FeedContent = ({ live }) => {
	const classes = useStyles();
	const history = useHistory();
	const { width } = useWindowDimensions();

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

	return (
		<>
			<Card className={classes.card}>
				<CardContent>
					<Grid container direction="column" justifyContent="center">
						<Grid item>
							<Box mb={1}>
								<Grid
									container
									direction="row"
									alignItems="center"
									justifyContent="space-between"
								>
									<Grid item>
										<Typography variant="h6">{live.gameEvent}</Typography>
									</Grid>
								</Grid>
							</Box>
						</Grid>
						<Divider />
						<Grid item className={classes.content}>
							<Box px={width < 494 ? 1 : 4} py={2}>
								<Grid
									container
									direction="row"
									alignItems="center"
									justifyContent={
										width > 494 ? 'space-evenly' : 'space-between'
									}
								>
									<Grid item>
										<Grid
											container
											direction="column"
											alignItems="center"
											spacing={2}
										>
											<Grid item>
												<Avatar
													alt="Team Logo"
													src={`/images/${live.teamOne.image}`}
												/>
											</Grid>
											<Grid item>
												<Typography
													variant={width < 600 ? 'subtitle1' : 'h6'}
													component="h6"
												>
													{live.teamOne.teamName}
												</Typography>
											</Grid>
										</Grid>
									</Grid>
									<Grid item>
										<Grid
											container
											direction="row"
											alignItems="stretch"
											justifyContent="center"
											spacing={2}
										>
											<Grid item>
												<Typography
													variant={width < 600 ? 'h4' : 'h2'}
													component="h6"
												>
													{teamOneScore}
												</Typography>
											</Grid>
											<Grid item>
												<Typography
													variant={width < 600 ? 'h4' : 'h2'}
													component="h6"
												>
													:
												</Typography>
											</Grid>
											<Grid item>
												<Typography
													variant={width < 600 ? 'h4' : 'h2'}
													component="h6"
												>
													{teamTwoScore}
												</Typography>
											</Grid>
										</Grid>
									</Grid>
									<Grid item>
										<Grid
											container
											direction="column"
											alignItems="center"
											spacing={2}
										>
											<Grid item>
												<Avatar
													alt="Team Logo"
													src={`/images/${live.teamTwo.image}`}
												/>
											</Grid>
											<Grid item>
												<Typography
													variant={width < 600 ? 'subtitle1' : 'h6'}
													component="h6"
												>
													{live.teamTwo.teamName}
												</Typography>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Box>
						</Grid>
						<Grid item className={classes.cta}>
							<Grid
								container
								direction="row"
								justifyContent="center"
								alignItems="center"
							>
								<CustomButton
									title="See Stats"
									variant="contained"
									className={classes.btn}
									onClick={() => history.push(`stats/${live._id}`)}
								/>
							</Grid>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</>
	);
};

export default FeedContent;
