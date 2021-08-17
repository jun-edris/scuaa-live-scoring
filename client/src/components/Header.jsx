import React, { useContext, useState } from 'react';
import {
	AppBar,
	Box,
	Container,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Toolbar,
	Typography,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFacebookF,
	faTwitter,
	faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import clsx from 'clsx';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useStyles from './../styles/header';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CustomButton from './common/CustomButton';
import MenuIcon from '@material-ui/icons/Menu';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { AuthContext } from '../context/AuthContext';
import { FetchContext } from '../context/FetchContext';

const navItems = [
	{
		label: 'Home',
		path: 'home',
	},
	{
		label: 'About',
		path: 'about',
	},
	{
		label: 'Contact',
		path: 'contact',
	},
	{
		label: 'Schedules',
		path: 'schedules',
	},
];

const NavItem = ({ navItem }) => {
	return (
		<ListItemText
			primary={<Typography align="center">{navItem.label}</Typography>}
		/>
	);
};

const Header = () => {
	const classes = useStyles();
	const location = useLocation();
	const [open, setOpen] = useState(false);
	const { width } = useWindowDimensions();
	const history = useHistory();
	const authContext = useContext(AuthContext);
	const fetchContext = useContext(FetchContext);

	const handleLogOut = async () => {
		try {
			await fetchContext.authAxios.get('/logout');
			authContext.logout();
			history.push('/');
		} catch (error) {
			console.log(error?.response?.message);
		}
	};

	return (
		<Grid
			container
			direction="column"
			justify="center"
			alignItems="center"
			className={classes.header}
		>
			<Container maxWidth="md">
				{/* top */}
				<Grid item>
					<Grid
						container
						direction="row"
						alignItems="center"
						justify="space-between"
						className={classes.header__top}
					>
						{/* logo */}
						<Grid item>
							<Grid
								container
								direction="column"
								alignItems="center"
								justify="center"
							>
								<Link to="/home">
									<Typography
										variant="h4"
										component="h1"
										className={clsx(classes.capitalize, classes.typoWhite)}
									>
										scuaa
									</Typography>
									<Typography
										variant="subtitle1"
										component="h1"
										className={clsx(classes.capitalize, classes.typoWhite)}
									>
										live scoring
									</Typography>
								</Link>
							</Grid>
						</Grid>
						{/* cta's */}
						<Grid item>
							<Grid
								container
								direction="row"
								alignItems="center"
								className={classes.right__topSection}
							>
								<Grid item>
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
								</Grid>
								<Grid item>
									<CustomButton
										title="Logout"
										Icon={<ExitToAppIcon size="medium" />}
										style={{
											backgroundColor: '#d8302f',
											padding: '9px 25px',
											color: '#fff',
											fontSize: '13px',
											borderRadius: '50px',
										}}
										onClick={handleLogOut}
										variant="contained"
									/>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				{/* bottom */}
				<Grid item>
					<AppBar position="static" className={classes.appBar}>
						<Toolbar>
							<Grid
								container
								direction="row-reverse"
								justify="center"
								alignItems="center"
								className={classes.toolbar}
							>
								<Grid item className={classes.navbar__header} xs={12}>
									<Grid
										container
										direction="row"
										alignItems="center"
										justify="flex-end"
									>
										<Grid item xs>
											<Typography varaint="body1">Menu</Typography>
										</Grid>
										<Grid item>
											<IconButton
												edge="start"
												color="inherit"
												aria-label="menu"
												onClick={() => setOpen(!open)}
											>
												<MenuIcon />
											</IconButton>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs>
									<List
										className={!open || width >= 600 ? classes.collapse : null}
										aria-expanded={open}
									>
										{navItems.map((navItem, index) => {
											const isCurrentRoute =
												location.pathname === `/${navItem.path}`;

											return (
												<ListItem
													button
													className={clsx(
														classes.link__container,
														isCurrentRoute && classes.inRoute
													)}
													key={index}
													disableGutters={true}
													dense
												>
													<Link
														to={navItem.path}
														className={clsx(
															!isCurrentRoute
																? classes.links
																: classes.inRouteLink
														)}
													>
														<NavItem
															navItem={navItem}
															isCurrentRoute={isCurrentRoute}
														/>
													</Link>
												</ListItem>
											);
										})}
										<ListItem
											disableGutters={true}
											dense
											className={classes.logoutHide}
										>
											<Box my={1}>
												<Grid container justify="center" alignItems="center">
													<ul className={classes.bottom__socialIcons}>
														<li className={classes.bottom__listSocialIcon}>
															<Link to="#">
																<IconButton
																	aria-label="Facebook"
																	size="small"
																	className={classes.bottom__social}
																>
																	<FontAwesomeIcon icon={faFacebookF} />
																</IconButton>
															</Link>
														</li>
														<li className={classes.bottom__listSocialIcon}>
															<Link to="#">
																<IconButton
																	aria-label="Twitter"
																	size="small"
																	className={classes.bottom__social}
																>
																	<FontAwesomeIcon icon={faTwitter} />
																</IconButton>
															</Link>
														</li>
														<li className={classes.bottom__listSocialIcon}>
															<Link to="#">
																<IconButton
																	aria-label="Twitter"
																	size="small"
																	className={classes.bottom__social}
																>
																	<FontAwesomeIcon icon={faYoutube} />
																</IconButton>
															</Link>
														</li>
													</ul>
												</Grid>
											</Box>
										</ListItem>
										<ListItem
											button
											disableGutters={true}
											dense
											className={classes.logoutHide}
										>
											<CustomButton
												title="Logout"
												Icon={<ExitToAppIcon size="medium" />}
												style={{
													backgroundColor: '#d8302f',
													padding: '9px 25px',
													color: '#fff',
													fontSize: '13px',
												}}
												onClick={handleLogOut}
												variant="contained"
												fullWidth
											/>
										</ListItem>
									</List>
								</Grid>
							</Grid>
						</Toolbar>
					</AppBar>
				</Grid>
			</Container>
		</Grid>
	);
};

export default Header;
