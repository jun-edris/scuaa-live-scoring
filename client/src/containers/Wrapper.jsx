import {
	AppBar,
	Box,
	Container,
	Drawer,
	Grid,
	Hidden,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
	useTheme,
} from '@material-ui/core';
import React, { useContext, useState } from 'react';
import useStyles from './../styles/wrapper';
import MenuIcon from '@material-ui/icons/Menu';
import Sidebar from '../components/Sidebar/Sidebar';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { AuthContext } from '../context/AuthContext';
import { AccountCircle } from '@material-ui/icons';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { FetchContext } from '../context/FetchContext';
import { useHistory } from 'react-router-dom';

const Wrapper = ({ children, window }) => {
	const classes = useStyles();
	const theme = useTheme();
	const history = useHistory();
	const { width } = useWindowDimensions();
	const [mobileOpen, setMobileOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const authContext = useContext(AuthContext);
	const fetchContext = useContext(FetchContext);
	const openMenu = Boolean(anchorEl);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogOut = async () => {
		try {
			await fetchContext.authAxios.get('/logout');
			authContext.logout();
			history.push('/');
		} catch (error) {
			console.log(error?.response?.message);
		}
	};

	const container =
		window !== undefined ? () => window().document.body : undefined;
	return (
		<>
			<div className={classes.root}>
				<AppBar position="fixed" className={classes.appBar}>
					<Toolbar>
						<Grid
							container
							direction="row"
							justifyContent="space-between"
							alignItems="center"
						>
							<Grid item>
								<IconButton
									color="inherit"
									aria-label="open drawer"
									edge="start"
									onClick={() => setMobileOpen(!mobileOpen)}
									className={classes.menuButton}
								>
									<MenuIcon />
								</IconButton>
							</Grid>
							<Grid item>
								<Grid container direction="row" spacing={2}>
									<Grid item>
										<Grid container direction="column" alignItems="flex-end">
											<Typography className={classes.user} variant="body1">
												{`${authContext.authState.userInfo.firstName} ${authContext.authState.userInfo.lastName}`}
											</Typography>
											<Typography variant="caption" className={classes.role}>
												{authContext.authState.userInfo.role}
											</Typography>
										</Grid>
									</Grid>
									<Grid item>
										<IconButton
											aria-label="account of current user"
											aria-controls="menu-appbar"
											aria-haspopup="true"
											onClick={handleMenu}
										>
											<AccountCircle />
										</IconButton>
										<Menu
											id="menu-appbar"
											anchorEl={anchorEl}
											anchorOrigin={{
												vertical: 'top',
												horizontal: 'right',
											}}
											keepMounted
											transformOrigin={{
												vertical: 'top',
												horizontal: 'right',
											}}
											open={openMenu}
											onClose={handleClose}
										>
											<MenuItem onClick={handleLogOut}>
												<ExitToAppIcon />
												&nbsp;Logout
											</MenuItem>
										</Menu>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
				<nav className={classes.drawer}>
					<Hidden smUp implementation="css">
						<Drawer
							container={container}
							variant="temporary"
							anchor={theme.direction === 'rtl' ? 'right' : 'left'}
							open={width > 960 ? false : mobileOpen}
							onClose={() => setMobileOpen(!mobileOpen)}
							classes={{
								paper: classes.drawerPaper,
							}}
							ModalProps={{
								keepMounted: true, // Better open performance on mobile.
							}}
						>
							<Sidebar />
						</Drawer>
					</Hidden>
					<Hidden smDown implementation="css">
						<Drawer
							classes={{
								paper: classes.drawerPaper,
							}}
							variant="permanent"
							open
						>
							<Sidebar />
						</Drawer>
					</Hidden>
				</nav>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					<Box>
						<Container className={classes.container}>{children}</Container>
					</Box>
				</main>
			</div>
		</>
	);
};

export default Wrapper;
