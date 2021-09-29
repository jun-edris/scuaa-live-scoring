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
	scores: {
		fontWeight: 'bold',
		[theme.breakpoints.down('sm')]: {
			fontWeight: 'regular',
		},
	},
	image: {
		height: '120px',
		width: '100%',
		[theme.breakpoints.down('sm')]: {
			height: '50px',
			width: '100%',
		},
	},
	mainDetail: {
		background: `linear-gradient(rgba(216, 48, 47, .9), rgba(255, 112, 0, .9)), url(${'/images/stadium-931975_1920.jpg'})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		height: '100%',
		width: '100%',
	},
	teamDiv: {
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
		},
	},
	teamName: {
		[theme.breakpoints.down('sm')]: {
			order: 2,
		},
	},
	teamImg: {
		[theme.breakpoints.down('sm')]: {
			order: 1,
		},
	},
	textColor: {
		color: 'white',
	},
}));
