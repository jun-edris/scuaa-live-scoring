import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HeaderCarousel from '../components/HeaderCarousel';
import useStyles from './../styles/about';
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const Contact = () => {
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
							Contact Us
						</Typography>
						<Grid container justifyContent="center" alignItems="center">
							<Grid item xs={12} md={9}>
								<Paper>
									<Box p={4}>
										<Box mb={4}>
											<Typography variant="body1" gutterBottom>
												Contact us with the details below.
											</Typography>
										</Box>
										<Grid container direction="column" spacing={2}>
											<Grid item>
												<Grid container alignItems="flex-start" spacing={2}>
													<Grid item>
														<HomeIcon />
													</Grid>
													<Grid item>
														<Grid container direction="column">
															<Grid item>
																<Typography variant="body1" gutterBottom>
																	Address:
																</Typography>
															</Grid>
															<Grid item>
																<Typography variant="body2" gutterBottom>
																	Cabad, Balilihan, Bohol
																</Typography>
															</Grid>
														</Grid>
													</Grid>
												</Grid>
											</Grid>
											<Grid item>
												<Grid container alignItems="flex-start" spacing={2}>
													<Grid item>
														<PhoneIcon />
													</Grid>
													<Grid item>
														<Grid container direction="column">
															<Grid item>
																<Typography variant="body1" gutterBottom>
																	Phone:
																</Typography>
															</Grid>
															<Grid item>
																<Typography variant="body2" gutterBottom>
																	+639 617 8965 761
																</Typography>
															</Grid>
														</Grid>
													</Grid>
												</Grid>
											</Grid>
											<Grid item>
												<Grid container alignItems="flex-start" spacing={2}>
													<Grid item>
														<MailOutlineIcon />
													</Grid>
													<Grid item>
														<Grid container direction="column">
															<Grid item>
																<Typography variant="body1" gutterBottom>
																	Email:
																</Typography>
															</Grid>
															<Grid item>
																<Typography variant="body2" gutterBottom>
																	bisu@gmail.com
																</Typography>
															</Grid>
														</Grid>
													</Grid>
												</Grid>
											</Grid>
										</Grid>
									</Box>
								</Paper>
							</Grid>
						</Grid>
					</Box>
				</Container>
			</section>
			<Footer />
		</>
	);
};

export default Contact;
