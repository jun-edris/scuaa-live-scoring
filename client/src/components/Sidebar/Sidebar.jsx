import {
	Divider,
	Grid,
	Icon,
	List,
	ListItem,
	ListItemText,
	Typography,
} from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import useStyles from './../../styles/sidebar';
import { navItems } from './navItems';
import clsx from 'clsx';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
	const classes = useStyles();
	const location = useLocation();
	const authContext = useContext(AuthContext);

	return (
		<>
			<div className={classes.toolbar} />
			<Divider />
			<List className={classes.root}>
				{navItems.map((navItem, index) => {
					const isCurrentRoute = location.pathname === `/${navItem.path}`;
					return (
						<Link
							to={navItem.path}
							className={clsx(
								classes.links,
								isCurrentRoute ? classes.inRoute : classes.notInRouteLink
							)}
							key={index}
						>
							{navItem.allowedRoles.includes(
								authContext.authState.userInfo.role
							) && (
								<ListItem className={clsx(classes.link__container)}>
									<ListItemText
										primary={
											<Grid container direction="row" alignItems="center">
												<Icon>{navItem.icon}</Icon>
												&nbsp;&nbsp;&nbsp;
												<Typography>{navItem.label}</Typography>
											</Grid>
										}
									/>
								</ListItem>
							)}
						</Link>
					);
				})}
			</List>
		</>
	);
};

export default Sidebar;
