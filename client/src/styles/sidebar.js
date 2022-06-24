import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
	root: {
		marginTop: '20px',
	},
	toolbar: theme.mixins.toolbar,
	inRoute: {
		padding: 0,
		background: theme.palette.secondary.main,
		border: 0,
		color: '#fff',
		'&:hover': {
			background: theme.palette.secondary.main,
			border: 0,
		},
	},
	link__container: {
		padding: '5px 20px',
		margin: '10px 0',
	},
	links: {
		listStyle: 'none',
		width: '100%',
		padding: 0,
		margin: '2px 0',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	notInRouteLink: {
		'&:hover': {
			background: '#d8302f',
			border: 0,
			color: '#fff',
		},
	},
	inRouteLink: {
		padding: 0,
		listStyle: 'none',
		margin: 0,
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		height: '100%',
	},
}));
