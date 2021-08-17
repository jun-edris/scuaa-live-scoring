import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
	root: {
		position: 'relative',
	},
	mySwiper: {
		minHeight: '81px',
		height: 'auto',
		width: '100vh',
		zIndex: 1,
	},
	slide: {
		width: '136px',
		height: 'inherit',
	},
	swiper__container: {
		width: '100%',
		height: '100%',
	},
}));
