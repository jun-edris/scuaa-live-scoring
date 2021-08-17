import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const FetchContext = createContext();
const { Provider } = FetchContext;

const FetchProvider = ({ children }) => {
	const [refreshKey, setRefreshKey] = useState(0);
	const [teams, setTeams] = useState([]);
	const [sched, setSched] = useState([]);

	const authAxios = axios.create({
		baseURL: process.env.REACT_APP_API_URL,
	});

	const resetKey = () => {
		setInterval(setRefreshKey(refreshKey + 1), 500);
		setInterval(setRefreshKey(0), 10000);
	};

	useEffect(() => {
		resetKey();
	}, []);

	return (
		<Provider
			value={{
				authAxios,
				setRefreshKey,
				refreshKey,
				teams,
				setTeams,
				setSched,
				sched,
			}}
		>
			{children}
		</Provider>
	);
};

export { FetchContext, FetchProvider };
