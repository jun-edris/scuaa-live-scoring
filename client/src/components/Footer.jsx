import {
	Box,
	Container,
	Divider,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './../styles/footer';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import clsx from 'clsx';
import MailIcon from '@material-ui/icons/Mail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFacebookF,
	faTwitter,
	faYoutube,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
	const classes = useStyles();
	return (
		<>
			<footer className={classes.root}>
				<Container>
					<Grid
						container
						direction="row"
						alignItems="flex-start"
						justifyContent="space-around"
						spacing={2}
					>
						<Grid item>
							<Box py={5}>
								<Grid
									container
									direction="column"
									alignItems="flex-start"
									spacing={1}
								>
									<Grid item>
										<Grid
											container
											direction="column"
											alignItems="center"
											justifyContent="center"
										>
											<Link to="/home">
												<Typography
													variant="h4"
													component="h1"
													className={clsx(
														classes.capitalize,
														classes.textWhite
													)}
												>
													scuaa
												</Typography>
												<Typography
													variant="subtitle1"
													component="h1"
													className={clsx(
														classes.capitalize,
														classes.textWhite
													)}
												>
													live scoring
												</Typography>
											</Link>
										</Grid>
									</Grid>
									<Grid item>
										<Typography
											paragraph
											className={clsx(classes.textWhite, classes.textBold)}
										>
											Watch live scoring of SCUAA ball games
										</Typography>
									</Grid>
									<Grid item>
										<Box mt={2}>
											<ul className={classes.social__icons}>
												<li className={classes.list__socialIcon}>
													<Link to="#">
														<IconButton
															aria-label="Facebook"
															size="small"
															className={classes.social}
														>
															<FontAwesomeIcon icon={faFacebookF} />
														</IconButton>
													</Link>
												</li>
												<li className={classes.list__socialIcon}>
													<Link to="#">
														<IconButton
															aria-label="Twitter"
															size="small"
															className={classes.social}
														>
															<FontAwesomeIcon icon={faTwitter} />
														</IconButton>
													</Link>
												</li>
												<li className={classes.list__socialIcon}>
													<Link to="#">
														<IconButton
															aria-label="Twitter"
															size="small"
															className={classes.social}
														>
															<FontAwesomeIcon icon={faYoutube} />
														</IconButton>
													</Link>
												</li>
											</ul>
										</Box>
									</Grid>
								</Grid>
							</Box>
						</Grid>
						<Grid item>
							<Box py={5}>
								<Grid
									container
									direction="row"
									spacing={7}
									justifyContent="center"
								>
									<Grid item>
										<Grid container direction="column">
											<Grid item>
												<Typography variant="h6" className={classes.textWhite}>
													Menu
												</Typography>
											</Grid>
											<Divider light />
											<Grid item>
												<List>
													<ListItem disableGutters>
														<Link to="/about" className={classes.textWhite}>
															About Us
														</Link>
													</ListItem>
													<ListItem disableGutters>
														<Link to="/contact" className={classes.textWhite}>
															Contact Us
														</Link>
													</ListItem>
												</List>
											</Grid>
										</Grid>
									</Grid>
									<Grid item>
										<Grid container direction="column">
											<Grid item>
												<Typography variant="h6" className={classes.textWhite}>
													Contact Us
												</Typography>
											</Grid>
											<Divider light />
											<Grid item>
												<List>
													<ListItem disableGutters>
														<Link to="/about" className={classes.textWhite}>
															<Grid
																container
																direction="row"
																alignItems="center"
															>
																<ListItemIcon>
																	<LocationOnIcon
																		className={classes.textWhite}
																	/>
																</ListItemIcon>
																<ListItemText
																	primary={
																		<Typography variant="body2">
																			Cabad, Balilihan, Bohol
																		</Typography>
																	}
																/>
															</Grid>
														</Link>
													</ListItem>
													<ListItem disableGutters>
														<Link to="/about" className={classes.textWhite}>
															<Grid
																container
																direction="row"
																alignItems="center"
															>
																<ListItemIcon>
																	<PhoneIcon className={classes.textWhite} />
																</ListItemIcon>
																<ListItemText
																	primary={
																		<Typography variant="body2">
																			+639 617 8965 761
																		</Typography>
																	}
																/>
															</Grid>
														</Link>
													</ListItem>
													<ListItem disableGutters>
														<Link to="/about" className={classes.textWhite}>
															<Grid
																container
																direction="row"
																alignItems="center"
															>
																<ListItemIcon>
																	<MailIcon className={classes.textWhite} />
																</ListItemIcon>
																<ListItemText
																	primary={
																		<Typography variant="body2">
																			bisu@gmail.com
																		</Typography>
																	}
																/>
															</Grid>
														</Link>
													</ListItem>
												</List>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Box>
						</Grid>
					</Grid>
				</Container>
				<Divider style={{ backgroundColor: '#424242' }} />
				<Grid container justifyContent="center" alignItems="center">
					<Grid item>
						<Box py={1}>
							<Typography variant="subtitle1" className={classes.textWhite}>
								Copyright &copy; 2021
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</footer>
		</>
	);
};

export default Footer;
