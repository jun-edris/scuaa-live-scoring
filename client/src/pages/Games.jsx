import { Grid, Paper } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import { FetchContext } from '../context/FetchContext';
import { AuthContext } from '../context/AuthContext';
import GamesTable from '../components/GamesTable';

const Games = () => {
	const [records, setRecords] = useState([]);
	const fetchContext = useContext(FetchContext);
	const authContext = useContext(AuthContext);

	const getAllLiveByUser = () => {
		fetchContext.authAxios
			.get(`/${authContext.authState.userInfo.role}/user-live-match/`)
			.then(({ data }) => {
				setRecords(data);
			});
	};

	useEffect(() => {
		getAllLiveByUser();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchContext.refreshKey]);

	return (
		<>
			<Grid container direction="column" spacing={4}>
				<Grid item>
					<Paper>
						<GamesTable records={records} />
					</Paper>
				</Grid>
			</Grid>
		</>
	);
};

export default Games;
