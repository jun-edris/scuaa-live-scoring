import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
	root: {
		position: 'relative',
	},
	mySwiper: {
		minHeight: '100vh',
		height: '100vh',
		width: '100vh',
		zIndex: 1,
	},
	swiper__slide: {
		/* Center slide text vertically */
		display: 'flex',
		'-webkit-box-pack': 'center',
		'-ms-flex-pack': 'center',
		'-webkit-justify-content': 'center',
		justifyContent: 'center',
		'-webkit-box-align': 'center',
		'-ms-flex-align': 'center',
		'-webkit-align-items': 'center',
		alignItems: 'center',
	},
	swiper__container: {
		width: '100%',
		height: '100%',
	},
	slide__one: {
		background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${'/images/raja-tilkian-tnUcI53e7zA-unsplash.jpg'})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		minHeight: '100vh',
		height: '100%',
		width: '100%',
	},
	slide__two: {
		background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${'/images/man-1837119_1920.jpg'})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		minHeight: '100vh',
		height: '100%',
		width: '100%',
	},
	slide__three: {
		background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${'/images/stadium-931975_1920.jpg'})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		minHeight: '100vh',
		height: '100%',
		width: '100%',
	},
	typoWhite: {
		color: '#fff',
	},
	textBold: {
		fontWeight: 'bold',
	},
}));
