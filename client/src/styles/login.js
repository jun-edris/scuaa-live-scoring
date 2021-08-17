import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
	root: {
		minHeight: '100vh',
		width: '100%',
	},
	backGroundSide: {
		background: `url(${'/images/sabri-tuzcu-dVhM3o9BVeg-unsplash.jpg'})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		height: '100vh',
		width: '100%',
	},
	formSide: {
		minHeight: '100vh',
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));
