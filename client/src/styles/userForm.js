import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
	form: {
		width: '100%',
		position: 'relative',
		margin: theme.spacing(3, 0),
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
	formControl: {
		minWidth: 120,
		width: '100%',
	},
}));
