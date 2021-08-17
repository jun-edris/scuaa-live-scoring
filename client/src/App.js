import './styles/styles.css';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { customTheme } from './constants/theme';

import Routes from './Routes';
import { AuthProvider } from './context/AuthContext';
import { FetchProvider } from './context/FetchContext';

const App = () => {
	return (
		<ThemeProvider theme={customTheme}>
			<AuthProvider>
				<FetchProvider>
					<Routes />
					<CssBaseline />
				</FetchProvider>
			</AuthProvider>
		</ThemeProvider>
	);
};

export default App;
