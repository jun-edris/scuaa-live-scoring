import { useState, createContext } from 'react';
import Pusher from 'pusher-js';
const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
	const userInfo = localStorage.getItem('userInfo');
	const expiresAt = localStorage.getItem('expiresAt');

	const pusher = new Pusher(process.env.REACT_APP_APP_KEY, {
		cluster: process.env.REACT_APP_CLUSTER,
	});

	const [authState, setAuthState] = useState({
		expiresAt,
		userInfo: userInfo ? JSON.parse(userInfo) : {},
	});

	const setAuthInfo = ({ userInfo, expiresAt }) => {
		localStorage.setItem('userInfo', JSON.stringify(userInfo));
		localStorage.setItem('expiresAt', expiresAt);
		setAuthState({
			userInfo,
			expiresAt,
		});
	};

	const logout = () => {
		localStorage.removeItem('userInfo');
		localStorage.removeItem('expiresAt');
		pusher.disconnect();
		setAuthState({
			token: null,
			expiresAt: null,
			userInfo: {},
		});
	};

	const isAuthenticated = () => {
		return new Date().getTime() / 1000 < authState.expiresAt;
	};

	const isAdmin = () => {
		return authState.userInfo.role === 'admin';
	};

	const isFacilitator = () => {
		return authState.userInfo.role === 'facilitator';
	};
	const isAuthorized = () => {
		return (
			authState.userInfo.role === 'facilitator' ||
			authState.userInfo.role === 'admin'
		);
	};

	return (
		<Provider
			value={{
				authState,
				setAuthState: (authInfo) => setAuthInfo(authInfo),
				isAuthenticated,
				logout,
				isAdmin,
				isFacilitator,
				isAuthorized,
				pusher,
			}}
		>
			{children}
		</Provider>
	);
};

export { AuthContext, AuthProvider };
