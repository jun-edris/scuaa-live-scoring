import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
	root: {
		position: 'relative',
		maxHeight: '400px',
		overflow: 'auto',
		width: '100%',
		[theme.breakpoints.down('sm')]: {
			marginTop: '50px',
		},
	},
	content: {
		width: '100%',
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
}));
