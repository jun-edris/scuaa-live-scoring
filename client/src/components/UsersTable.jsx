import { useContext, useState } from 'react';
import {
	TableBody,
	TableCell,
	TableRow,
	Typography,
	Tooltip,
	IconButton,
} from '@material-ui/core';
import useTable from './../hooks/useTable';
import PopupUpdate from './common/PopupUpdate';
import PopupDelete from './common/PopupDelete';
import TableHeader from './TableHeader';
import Render from './../components/User/Render';
import { AuthContext } from '../context/AuthContext';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { FetchContext } from '../context/FetchContext';

const headCells = [
	{ id: 'lastName', label: 'Name' },
	{ id: 'email', label: 'Email' },
	{ id: 'role', label: 'Role', disableSorting: true },
	{ id: 'gameEvent', label: 'Sports Event', disableSorting: true },
	{ id: 'buttons', label: '', disableSorting: true },
];

const UsersTable = ({ records }) => {
	const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
	const [openDeletePopup, setOpenDeletePopup] = useState(false);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [failed, setFailed] = useState(false);
	const [success, setSuccess] = useState();
	const [error, setError] = useState();
	const [user, setUser] = useState({});
	const [role, setRole] = useState('');
	const authContext = useContext(AuthContext);
	const fetchContext = useContext(FetchContext);

	const [filterFn, setFilterFn] = useState({
		fn: (items) => {
			return items;
		},
	});

	const { TblContainer, TblHead, recordsAfterPagingAndSorting, TblPagination } =
		useTable(records, headCells, filterFn);

	const handleSearch = (e) => {
		let target = e.target;
		setFilterFn({
			fn: (items) => {
				if (target.value === '') return items;
				else
					return items.filter(
						(users) =>
							users.firstName.toLowerCase().includes(target.value) ||
							users.lastName.toLowerCase().includes(target.value) ||
							users.role.toLowerCase().includes(target.value) ||
							users.email.toLowerCase().includes(target.value)
					);
			},
		});
	};

	const handleClose = () => {
		setOpenDeletePopup(false);
		setOpenUpdatePopup(false);
	};

	const onDelete = async (id) => {
		if (authContext.authState.userInfo._id === id) {
			setError('You are deleting your own account');
		} else {
			try {
				setLoading(true);
				const { data } = await fetchContext.authAxios.delete(
					`${authContext.authState.userInfo.role}/delete-user/${id}`
				);

				setSuccess(data.message);
				setError('');
				setTimeout(() => {
					setLoading(false);
				}, 400);
			} catch (err) {
				const { data } = err.response;
				setError(data.message);
				setSuccess('');
			}
		}
	};

	return (
		<>
			<TableHeader title="Users" handleSearch={handleSearch} />
			<TblContainer>
				<TblHead />
				<TableBody>
					{recordsAfterPagingAndSorting().map((item, index) => (
						<TableRow key={index}>
							<TableCell>{`${item.lastName}, ${item.firstName}`}</TableCell>
							<TableCell>{item.email}</TableCell>
							<TableCell>{item.role}</TableCell>
							<TableCell>
								{item.gameEvent !== 'none' && item.gameEvent ? (
									item.gameEvent
								) : (
									<Typography color="error">Not Applicable</Typography>
								)}
							</TableCell>
							<TableCell align="center">
								{authContext.authState.userInfo._id === item._id ? (
									'You'
								) : (
									<>
										<Tooltip title="Update">
											<IconButton
												aria-label="update"
												onClick={() => {
													setUser(item);
													setRole(item.role);
													setOpenUpdatePopup(true);
												}}
											>
												<CreateIcon color="secondary" />
											</IconButton>
										</Tooltip>
										<Tooltip title="Delete">
											<IconButton
												aria-label="delete"
												onClick={() => {
													setUser(item);
													setOpenDeletePopup(true);
												}}
											>
												<DeleteIcon color="error" />
											</IconButton>
										</Tooltip>
									</>
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</TblContainer>
			<TblPagination />
			<PopupUpdate
				openUpdatePopup={openUpdatePopup}
				handleClose={handleClose}
				title={`Update ${role}`}
			>
				<Render user={user} role={role} />
			</PopupUpdate>
			<PopupDelete
				openDeletePopup={openDeletePopup}
				handleClose={handleClose}
				title="Delete User?"
				data={user}
				onDelete={onDelete}
				success={success}
				error={error}
				open={open}
				setOpen={setOpen}
				setFailed={setFailed}
				failed={failed}
				loading={loading}
			/>
		</>
	);
};

export default UsersTable;
