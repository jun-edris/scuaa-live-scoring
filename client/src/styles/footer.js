import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
	root: {
		background: theme.palette.common.black,
	},
	textWhite: {
		color: '#fff',
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
}));
