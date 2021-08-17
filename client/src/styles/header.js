import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
	header: {
		position: 'absolute',
		width: '100%',
		top: 0,
		minHeight: '150px',
		zIndex: 5,
	},
	header__top: {
		margin: '15px 0 10px',
		width: '100%',
		[theme.breakpoints.down('xs')]: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
	},
	right__topSection: {
		[theme.breakpoints.down('xs')]: {
			display: 'none',
		},
	},
	capitalize: {
		textTransform: 'uppercase',
	},
	social__icons: {
		listStyle: 'none',
		width: 'auto',
		padding: 0,
		margin: 0,
		display: 'flex',
		flexDirection: 'row',
	},
	list__socialIcon: {
		marginRight: '15px',
	},
	social: {
		color: '#fff',
		border: '1px solid #fff',
		width: '40px',
		height: '40px',
		'&:hover': {
			backgroundColor: '#d8302f',
			transition: 'all 0.3s ease-in-out 0s',
			border: '1px solid #d8302f',
		},
	},
	bottom__socialIcons: {
		listStyle: 'none',
		width: 'auto',
		padding: 0,
		margin: 0,
		display: 'flex',
		flexDirection: 'row',
	},
	bottom__listSocialIcon: {
		margin: '0 15px',
	},
	bottom__social: {
		color: '#000',
		border: '1px solid #000',
		width: '40px',
		height: '40px',
		'&:hover': {
			backgroundColor: '#d8302f',
			transition: 'all 0.3s ease-in-out 0s',
			border: '1px solid #d8302f',
			color: '#fff',
		},
	},
	appBar: {
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.text.primary,
	},
	toolbar: {
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'space-between',
		},
	},
	navbar__header: {
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	active: {
		borderBottom: '3px solid #d8302f',
	},
	link__container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 0,
		margin: 4,
	},
	links: {
		listStyle: 'none',
		width: '100%',
		height: '100%',
		padding: 0,
		margin: 0,
		display: 'flex',
		flexDirection: 'row',
	},
	inRouteLink: {
		padding: 0,
		[theme.breakpoints.down('xs')]: {
			listStyle: 'none',
			margin: 0,
			display: 'flex',
			flexDirection: 'row',
			color: '#fff',
			width: '100%',
			height: '100%',
		},
	},
	link: {
		'&:hover': {
			color: '#d8302f',
			transition: 'all 0.3s ease-in-out 0s',
		},
	},
	inRoute: {
		borderBottom: '3px solid #d8302f',
		padding: 0,
		[theme.breakpoints.down('xs')]: {
			background: '#d8302f',
			border: 0,
			color: '#fff',
		},
		'&:hover': {
			[theme.breakpoints.down('xs')]: {
				background: '#d8302f',
				border: 0,
			},
		},
	},
	collapse: {
		display: 'flex',
		flexDirection: 'row',
		justifyContext: 'center',
		alignItems: 'center',
		[theme.breakpoints.down('xs')]: {
			display: 'none',
		},
	},
	typoWhite: {
		color: '#fff',
	},
	logoutHide: {
		display: 'none',
		[theme.breakpoints.down('xs')]: {
			display: 'block',
		},
	},
}));
