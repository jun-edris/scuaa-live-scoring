import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
	root: {
		position: 'relative',
	},
	full__slider: {
		position: 'relative',
	},
	main: {
		position: 'relative',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'row-reverse',
		},
	},
}));
