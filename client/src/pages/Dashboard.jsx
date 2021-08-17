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

	useEffect(() => {
		getTeams();
	}, []);
	return (
		<>
			<DashboardSection1 />
			<DashboardAdminContent />
		</>
	);
};

export default Dashboard;
