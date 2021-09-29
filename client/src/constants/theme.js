import { createTheme } from '@material-ui/core/styles';

export const customTheme = createTheme({
	// mao ni latest
	palette: {
		type: 'dark',
		primary: {
			main: '#179BE8',
		},
		secondary: {
			main: '#E86417',
		},
		background: {
			default: '#0A1929',
			paper: '#001E3C',
		},
	},
	typography: {
		fontFamily: [
			'"Poppins"',
			'"Arvo"',
			'"Raleway"',
			'"Source Sans Pro"',
			'"Arial"',
			'" sans-serif"',
		].join(','),
		fontSize: 15,
	},
	subtitle1: {
		fontFamily: '"Arvo", sans-serif',
	},
	subtitle2: {
		fontFamily: '"Arvo", sans-serif',
	},
	p: {
		fontFamily: '"Poppins", sans-serif',
	},
});
