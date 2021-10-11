import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		[theme.breakpoints.up('md')]: {
			width: `calc(100% - 240px)`,
			marginLeft: 240,
		},
	},
	drawer: {
		[theme.breakpoints.up('md')]: {
			width: 240,
			flexShrink: 0,
		},
	},
	drawerPaper: {
		width: 240,
	},
	content: {
		flexGrow: 1,
	},
	container: {
		paddingTop: theme.spacing(12),
		paddingBottom: theme.spacing(4),
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	role: {
		textTransform: 'capitalize',
	},
}));
