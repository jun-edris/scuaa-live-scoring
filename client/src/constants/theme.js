import { createMuiTheme } from '@material-ui/core/styles';

export const customTheme = createMuiTheme({
	// mao ni latest
	palette: {
		common: { black: '#000', white: '#fff' },
		background: {
			paper: '#fff',
			default: '#fff',
		},
		primary: {
			light: '#9d9d9d',
			main: '#d8302f',
			dark: '#000000',
			contrastText: '#f5f5f5',
		},
		secondary: {
			light: '#f5f5f5',
			main: '#d9d9d9',
			dark: '#9d9d9d',
			contrastText: '#000000',
		},
		error: {
			light: '#e57373',
			main: '#f44336',
			dark: '#d32f2f',
			contrastText: '#fff',
		},
		info: {
			light: '#64b5f6',
			main: '#2196f3',
			dark: '#1976d2',
			contrastText: '#fff',
		},
		success: {
			light: '#81c784',
			main: '#4caf50',
			dark: '#388e3c',
			contrastText: 'rgba(0,0,0,0.87)',
		},
		text: {
			primary: 'rgba(0, 0, 0, 0.87)',
			secondary: 'rgba(0, 0, 0, 0.54)',
			disabled: 'rgba(0, 0, 0, 0.38)',
			hint: 'rgba(0, 0, 0, 0.38)',
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