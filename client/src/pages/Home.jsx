import { Box, Container, Grid } from '@material-ui/core';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HeaderCarousel from '../components/HeaderCarousel';
import InGameList from '../components/InGameList';
import ScheduleCarousel from '../components/ScheduleCarousel';
import FeedContainer from '../containers/FeedContainer';
import StandingContainer from '../containers/StandingContainer';
import TeamContainer from '../containers/TeamContainer';
import useStyles from './../styles/home';

const Home = () => {
	const classes = useStyles();
	return (
		<>
			<section className={classes.root}>
				<Header />
				<div className={classes.full__slider}>
					<HeaderCarousel />
				</div>
			</section>
			<section className={classes.root}>
				<Box mt={2} mb={4}>
					<ScheduleCarousel />
				</Box>
			</section>
			<Box pb={10}>
				<Container maxWidth="lg">
					<Grid
						container
						className={classes.main}
						direction="row-reverse"
						justify="space-between"
						spacing={2}
					>
						<Grid item xs={12} md={8}>
							<FeedContainer />
						</Grid>
						<Grid item xs={12} md={4}>
							<Box mb={6}>
								<InGameList />
							</Box>
							<Box mb={6}>
								<StandingContainer />
							</Box>
							<Box mb={6}>
								<TeamContainer />
							</Box>
						</Grid>
					</Grid>
				</Container>
			</Box>
			<Footer />
		</>
	);
};

export default Home;
