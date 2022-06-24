import { createTheme } from '@material-ui/core/styles';

export const customTheme = createTheme({
	// mao ni latest
	palette: {
		type: 'light',
		primary: {
			main: '#0140a4',
			contrastText: 'rgba(255,255,255,0.87)',
		},
		secondary: {
			main: '#ff8000',
		},
		background: {
			default: '#e8e8e8',
			paper: '#fff',
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
