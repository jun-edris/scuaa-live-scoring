import { Grid, Paper } from '@material-ui/core';
import React, { useContext, useEffect, useState, useRef } from 'react';
import CustomButton from '../components/common/CustomButton';
import PopupDialog from '../components/common/PopupDialog';
import Render from './../components/Team/Render';
import AddIcon from '@material-ui/icons/Add';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import { gameEvent } from './../constants/selection';
import TeamsTable from '../components/TeamsTable';
import PopupDelete from '../components/common/PopupDelete';
import { FetchContext } from '../context/FetchContext';
import { AuthContext } from '../context/AuthContext';

const Team = () => {
	const inputEl = useRef(null);
	const [records, setRecords] = useState([]);
	const [openPopup, setOpenPopup] = useState(false);
	const [openDeletePopup, setOpenDeletePopup] = useState(false);
	const [role, setRole] = useState('');
	const fetchContext = useContext(FetchContext);
	const authContext = useContext(AuthContext);

	const getTeams = () => {
		fetchContext.authAxios
			.get('/get-all-teams')
			.then(({ data }) => {
				setRecords(data);
			})
			.catch((error) => console.log(error));
	};

	const handleClose = () => {
		setOpenPopup(false);
		setOpenDeletePopup(false);
	};

	const onDelete = async () => {
		try {
			await fetchContext.authAxios.delete(
				`${authContext.authState.userInfo.role}/delete-all-team`
			);
		} catch (err) {
			const { data } = err.response;
			console.log(data.message);
		}
	};

	useEffect(() => {
		getTeams();

		const teamChannel = authContext.pusher.subscribe('teams');

		teamChannel.bind('inserted', (newTeams) => {
			setRecords((records) => [...records, newTeams]);
			fetchContext.setTeams((team) => [...fetchContext.teams, newTeams]);
			fetchContext.setRefreshKey((fetchContext.refreshKey = +1));
		});

		teamChannel.bind('uploaded-image', (addedImage) => {
			setRecords(
				records.map((team) =>
					team._id === addedImage._id ? { ...records, addedImage } : team
				)
			);
			fetchContext.setTeams(
				fetchContext.teams.map((team) =>
					team._id === addedImage._id
						? { ...fetchContext.teams, addedImage }
						: team
				)
			);
			fetchContext.setRefreshKey((fetchContext.refreshKey = +1));
		});

		teamChannel.bind('updated', (updatedTeam) => {
			setRecords(
				records.map((team) =>
					team._id === updatedTeam._id ? { ...records, updatedTeam } : team
				)
			);
			fetchContext.setTeams(
				fetchContext.teams.map((team) =>
					team._id === updatedTeam._id
						? { ...fetchContext.teams, updatedTeam }
						: team
				)
			);
			fetchContext.setRefreshKey((fetchContext.refreshKey = +1));
		});

		teamChannel.bind('deleted', (deletedTeam) => {
			setRecords(
				records.filter((team, index) => team._id !== deletedTeam[index]._id)
			);
			fetchContext.setRefreshKey(fetchContext.refreshKey + 1);
		});

		teamChannel.bind('deleted-all', (deletedTeams) => {
			setRecords(
				records.filter((team, index) => team._id !== deletedTeams[index]._id)
			);
			fetchContext.setRefreshKey(fetchContext.refreshKey + 1);
		});
		return () => {
			teamChannel.unbind_all();
			teamChannel.unsubscribe('teams');
		};
	}, [fetchContext.refreshKey]);

	return (
		<>
			<Grid container direction="column" spacing={4}>
				<Grid item>
					<Grid
						container
						direction="row"
						justify="flex-end"
						alignItems="center"
						spacing={2}
					>
						<Grid item>
							<CustomButton
								title="Delete all"
								Icon={<ClearAllIcon />}
								variant="contained"
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
						<TeamsTable
							records={
								fetchContext.teams.length === 0 ? records : fetchContext.teams
							}
						/>
					</Paper>
				</Grid>
			</Grid>
			<PopupDialog
				openPopup={openPopup}
				handleClose={handleClose}
				title="Create Team"
				data={gameEvent}
				selectionTitle="Select game event"
				role={role}
				setRole={setRole}
				inputEl={inputEl}
			>
				<Render game={role} />
			</PopupDialog>
			<PopupDelete
				openDeletePopup={openDeletePopup}
				handleClose={handleClose}
				title="Delete All Teams?"
				onDeleteAll={onDelete}
			/>
		</>
	);
};

export default Team;
