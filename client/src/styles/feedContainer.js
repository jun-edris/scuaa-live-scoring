import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
	root: {
		position: 'relative',
		maxHeight: '1342.69px',
		minHeight: '1342.69px',
		height: '100%',
		width: '100%',
		[theme.breakpoints.down('sm')]: {
			maxHeight: 420,
			minHeight: 420,
		},
	},
	content: {
		position: 'absolute',
		right: 0,
		left: 0,
		maxHeight: '832px',
		height: '100%',
		width: '100%',
		overflowY: 'scroll',
		padding: '1px 10px',
	},
}));
