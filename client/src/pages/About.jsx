import { Box, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import Header from '../components/Header';
import HeaderCarousel from '../components/HeaderCarousel';
import Footer from '../components/Footer';
import useStyles from './../styles/about';
const About = () => {
	const classes = useStyles();
	return (
		<>
			<section className={classes.root}>
				<Header />
				<div className={classes.full__slider}>
					<HeaderCarousel />
				</div>
			</section>
			<section>
				<Container maxWidth="md">
					<Box mt={4} mb={12}>
						<Typography variant="h3" gutterBottom component="h2">
							About Us
						</Typography>
						<Grid container>
							<Grid item xs={12} md={8}>
								<Typography variant="body1" gutterBottom>
									The State Colleges and Universities Athletic Association
									(SCUAA) is an association of 93 institutions, conferences,
									organizations, and individuals that organizes the athletic
									programs of different state colleges and universities in the
									Philippines. SCUAA is one of the inter-collegiate sports
									associations in the Philippines, the union of seven major
									state colleges and universities in Metro Manila. Despite many
									years of challenges in the forefront, SCUAA was able to gain
									ground in various regions in the country through the creation
									of regional or satellite SCUAA, hence the establishment of a
									National SCUAA in the mid-1980s.
								</Typography>
							</Grid>
							<Grid item xs={12} md={4}></Grid>
						</Grid>
					</Box>
				</Container>
			</section>
			<Footer />
		</>
	);
};

export default About;
