import { Grid, Paper } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import CustomButton from '../components/common/CustomButton';
import ScheduleTable from './../components/ScheduleTable';
import AddIcon from '@material-ui/icons/Add';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import { FetchContext } from '../context/FetchContext';
import ScheduleForm from '../components/ScheduleForm';
import { AuthContext } from '../context/AuthContext';
import PopupSchedule from '../components/common/PopupSchedule';
import PopupDeleteAll from '../components/common/PopupDeleteAll';

const Match = () => {
	const [records, setRecords] = useState([]);
	const [openPopup, setOpenPopup] = useState(false);
	const [openDeletePopup, setOpenDeletePopup] = useState(false);
	const fetchContext = useContext(FetchContext);
	const authContext = useContext(AuthContext);

	const getAllSched = () => {
		fetchContext.authAxios
			.get(`/${authContext.authState.userInfo.role}/schedule-user`)
			.then(({ data }) => {
				setRecords(data);
			});
	};

	const onDelete = async () => {
		try {
			const { data } = await fetchContext.authAxios.delete(
				`/${authContext.authState.userInfo.role}/delete-all-schedule/`
			);
			console.log(data.message);
		} catch (err) {
			const { data } = err.response;
			console.log(data.message);
		}
	};

	useEffect(() => {
		getAllSched();

		const schedChannel = authContext.pusher.subscribe('schedule');

		schedChannel.bind('created', (newSched) => {
			setRecords((records) => [...records, newSched]);
			fetchContext.setSched((sched) => [...fetchContext.sched, newSched]);
			fetchContext.setRefreshKey((fetchContext.refreshKey = +1));
		});

		schedChannel.bind('updated', (updatedSched) => {
			setRecords(
				records.map((sched) =>
					sched._id === updatedSched._id ? { ...records, updatedSched } : sched
				)
			);
			fetchContext.setSched(
				fetchContext.sched.map((sched) =>
					sched._id === updatedSched._id
						? { ...fetchContext.sched, updatedSched }
						: sched
				)
			);
			fetchContext.setRefreshKey((fetchContext.refreshKey = +1));
		});

		schedChannel.bind('deleted', (deletedSched) => {
			setRecords(
				records.filter((sched, index) => sched._id !== deletedSched[index]._id)
			);
			fetchContext.setRefreshKey((fetchContext.refreshKey = +1));
		});

		schedChannel.bind('deleted-all-by-user', (deletedScheds) => {
			setRecords(
				records.filter((sched, index) => sched._id !== deletedScheds[index]._id)
			);
			fetchContext.setRefreshKey((fetchContext.refreshKey = +1));
		});

		const liveMatchChannel = authContext.pusher.subscribe('liveMatch');

		liveMatchChannel.bind('inserted', function (newLiveMatch) {
			fetchContext.setLiveMatchList([
				...fetchContext.setLiveMatchListliveMatchList,
				newLiveMatch,
			]);
			fetchContext.setRefreshKey((fetchContext.refreshKey = +1));
		});

		return () => {
			schedChannel.unbind_all();
			schedChannel.unsubscribe('schedule');
			liveMatchChannel.unbind_all();
			liveMatchChannel.unsubscribe('liveMatch');
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchContext.refreshKey]);

	const handleClose = () => {
		setOpenPopup(false);
		setOpenDeletePopup(false);
	};

	return (
		<>
			<Grid container direction="column" spacing={4}>
				<Grid item>
					<Grid
						container
						direction="row"
						justifyContent="flex-end"
						alignItems="center"
						spacing={2}
					>
						<Grid item>
							<CustomButton
								title="Delete all"
								Icon={<ClearAllIcon />}
								variant="contained"
								color="secondary"
								onClick={() => setOpenDeletePopup(true)}
							/>
						</Grid>
						<Grid item>
							<CustomButton
								title="Add New"
								Icon={<AddIcon />}
								variant="contained"
								onClick={() => setOpenPopup(true)}
								color="primary"
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Paper>
						<ScheduleTable records={records} />
					</Paper>
				</Grid>
			</Grid>
			<PopupSchedule
				openPopup={openPopup}
				handleClose={handleClose}
				title="Add New Schedule"
			>
				<ScheduleForm />
			</PopupSchedule>
			<PopupDeleteAll
				openDeletePopup={openDeletePopup}
				handleClose={handleClose}
				title="Delete All Schedule?"
				onDeleteAll={onDelete}
			/>
		</>
	);
};

export default Match;
