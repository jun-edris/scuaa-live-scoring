import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Avatar,
	Card,
	CardContent,
	Grid,
	Icon,
	Typography,
} from '@material-ui/core';
import { faPlay, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import useStyles from './../styles/dashboarddefault1';
import { FetchContext } from '../context/FetchContext';

const DashboardSection1 = () => {
	const classes = useStyles();
	const fetchContext = useContext(FetchContext);
	const [teams, setTeams] = useState(0);
	const [sched, setSched] = useState(0);
	const [live, setLive] = useState(0);

	const getNumberOfTeams = () => {
		fetchContext.authAxios
			.get(`/get-number-teams`)
			.then(({ data }) => {
				setTeams(data.teams);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getNumberOfSchedules = () => {
		fetchContext.authAxios
			.get(`/number-schedules`)
			.then(({ data }) => {
				setSched(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const getNumberOfLive = () => {
		fetchContext.authAxios
			.get(`/number-live/`)
			.then(({ data }) => {
				setLive(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			getNumberOfTeams();
			getNumberOfSchedules();
			getNumberOfLive();
		}
		return () => {
			isMounted = false;
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchContext.refreshKey]);
	return (
		<>
			<Grid container spacing={4}>
				<Grid item xs={12} sm>
					<Card className={classes.card}>
						<CardContent>
							<Grid container direction="row" alignItems="center">
								<Grid item sm>
									<Typography variant="subtitle1">Teams</Typography>
									<Typography variant="h3" component="h6">
										{fetchContext.teams.length === 0
											? teams
											: fetchContext.teams.length}
									</Typography>
								</Grid>
								<Grid item>
									<Avatar style={{ backgroundColor: '#2196f3' }}>
										<FontAwesomeIcon icon={faUsers} />
									</Avatar>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} sm>
					<Card className={classes.card}>
						<CardContent>
							<Grid container direction="row" alignItems="center">
								<Grid item sm>
									<Typography variant="subtitle1">Schedules</Typography>
									<Typography variant="h3" component="h6">
										{fetchContext.sched.length === 0
											? sched
											: fetchContext.sched.length}
									</Typography>
								</Grid>
								<Grid item>
									<Avatar style={{ backgroundColor: '#ffc107' }}>
										<Icon>pending_actions</Icon>
									</Avatar>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} sm>
					<Card className={classes.card}>
						<CardContent>
							<Grid container direction="row" alignItems="center">
								<Grid item sm>
									<Typography variant="subtitle1">Live Games</Typography>
									<Typography variant="h3" component="h6">
										{fetchContext.liveMatchList.length === 0
											? live
											: fetchContext.liveMatchList.length}
									</Typography>
								</Grid>
								<Grid item>
									<Avatar style={{ backgroundColor: '#f44336' }}>
										<FontAwesomeIcon icon={faPlay} />
									</Avatar>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</>
	);
};

export default DashboardSection1;
