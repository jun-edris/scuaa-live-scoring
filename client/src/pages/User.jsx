import { Grid, Paper } from '@material-ui/core';
import CustomButton from '../components/common/CustomButton';
import UsersTable from './../components/UsersTable';
import AddIcon from '@material-ui/icons/Add';
import { useContext, useEffect, useState } from 'react';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import PopupDialog from '../components/common/PopupDialog';
import { users } from './../constants/selection';
import Render from './../components/User/Render';
import useStyles from './../styles/user';
import PopupDelete from '../components/common/PopupDelete';
import { AuthContext } from '../context/AuthContext';
import { FetchContext } from '../context/FetchContext';

const User = () => {
	const classes = useStyles();
	const [records, setRecords] = useState([]);
	const [openPopup, setOpenPopup] = useState(false);
	const [openDeletePopup, setOpenDeletePopup] = useState(false);
	// const [loading, setLoading] = useState(false);
	const [role, setRole] = useState('');
	const fetchContext = useContext(FetchContext);
	const authContext = useContext(AuthContext);

	const getUsers = () => {
		fetchContext.authAxios
			.get(`/${authContext.authState.userInfo.role}/get-all-users`)
			.then(({ data }) => {
				setRecords(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const onDelete = async () => {
		try {
			await fetchContext.authAxios.delete(
				`/${authContext.authState.userInfo.role}/delete-all-users`
			);
		} catch (err) {
			const { data } = err.response;
			console.log(data.message);
		}
	};

	const handleClose = () => {
		setOpenPopup(false);
		setOpenDeletePopup(false);
	};

	useEffect(() => {
		getUsers();
		const usersChannel = authContext.pusher.subscribe('users');

		usersChannel.bind('created', (newUsers) => {
			setRecords((records) => [...records, newUsers]);
			fetchContext.setRefreshKey((fetchContext.refreshKey = +1));
		});

		usersChannel.bind('updated', (updatedUser) => {
			setRecords(
				records.map((user) =>
					user._id === updatedUser._id ? { ...records, updatedUser } : user
				)
			);
			fetchContext.setRefreshKey((fetchContext.refreshKey = +1));
		});

		usersChannel.bind('updated-facilitator', (updatedUser) => {
			setRecords(
				records.map((user) =>
					user._id === updatedUser._id ? { ...records, updatedUser } : user
				)
			);
			fetchContext.setRefreshKey((fetchContext.refreshKey = +1));
		});

		usersChannel.bind('deleted-user', (deletedUser) => {
			setRecords(
				records.filter((user, index) => user._id !== deletedUser[index]._id)
			);
			fetchContext.setRefreshKey(fetchContext.refreshKey + 1);
		});

		usersChannel.bind('deleted-all-user', (deletedUsers) => {
			setRecords(
				records.filter((user, index) => user.id !== deletedUsers[index]?._id)
			);
			fetchContext.setRefreshKey(fetchContext.refreshKey + 1);
		});

		return () => {
			usersChannel.unbind_all();
			usersChannel.unsubscribe('users');
		};
	}, [fetchContext.refreshKey]);

	return (
		<>
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
			<div className={classes.wrapper}>
				<Paper className={classes.root}>
					<UsersTable records={records} />
				</Paper>
			</div>

			<PopupDialog
				openPopup={openPopup}
				handleClose={handleClose}
				title="Create User"
				data={users}
				role={role}
				setRole={setRole}
				selectionTitle="Select user role"
			>
				<Render role={role} />
			</PopupDialog>
			<PopupDelete
				openDeletePopup={openDeletePopup}
				handleClose={handleClose}
				title="Delete All User?"
				onDeleteAll={onDelete}
			/>
		</>
	);
};

export default User;
