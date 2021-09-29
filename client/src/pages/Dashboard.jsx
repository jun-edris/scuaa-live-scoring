// import { Container, Paper, Typography } from '@material-ui/core';

import DashboardSection1 from '../components/DashboardSection1';
import DashboardAdminContent from '../components/DashboardAdminContent';
import { useContext, useEffect } from 'react';
import { FetchContext } from '../context/FetchContext';

const Dashboard = () => {
	const fetchContext = useContext(FetchContext);

	const getTeams = () => {
		fetchContext.authAxios
			.get('/get-all-teams')
			.then(({ data }) => {
				fetchContext.setTeams(data);
			})
			.catch((error) => console.log(error));
	};

	const getLiveMatches = () => {
		fetchContext.authAxios
			.get('/all-live-match/')
			.then(({ data }) => {
				fetchContext.setLiveMatchList(data);
			})
			.catch((error) => console.log(error));
	};

	const getAllSchedules = () => {
		fetchContext.authAxios
			.get('/schedules/')
			.then(({ data }) => {
				fetchContext.setScheduleList(data);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		getTeams();
		getLiveMatches();
		getAllSchedules();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchContext.refreshKey]);
	return (
		<>
			<DashboardSection1 />
			<DashboardAdminContent />
		</>
	);
};

export default Dashboard;
