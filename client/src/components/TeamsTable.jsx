import { useContext, useRef, useState } from 'react';
import {
	TableBody,
	TableCell,
	TableRow,
	Typography,
	Tooltip,
	IconButton,
	Grid,
	Avatar,
} from '@material-ui/core';
import TableHeader from './TableHeader';
import useTable from './../hooks/useTable';
import PopupUpdate from './common/PopupUpdate';
import PopupDelete from './common/PopupDelete';
import Render from './Team/Render';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import PopupImageUpload from './common/PopupImageUpload';
import { FetchContext } from '../context/FetchContext';
import { AuthContext } from '../context/AuthContext';

const headCells = [
	{ id: 'teamName', label: 'Team Name' },
	{ id: 'players', label: 'Players', disableSorting: true },
	{ id: 'gameEvent', label: 'Game Event', disableSorting: true },
	{ id: 'buttons', label: '', disableSorting: true },
];

const TeamsTable = ({ records }) => {
	const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
	const [openDeletePopup, setOpenDeletePopup] = useState(false);
	const [openAddImageAlert, setOpenAddImageAlert] = useState(false);
	const [open, setOpen] = useState(false);
	const [failed, setFailed] = useState(false);
	const [success, setSuccess] = useState();
	const [error, setError] = useState();
	const authContext = useContext(AuthContext);
	const fetchContext = useContext(FetchContext);
	const [team, setTeam] = useState({});
	const [game, setGame] = useState('');
	const inputEl = useRef(null);
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
						(teams) =>
							teams.teamName.toLowerCase().includes(target.value) ||
							teams.gameEvent.toLowerCase().includes(target.value)
					);
			},
		});
	};

	const handleClose = () => {
		setOpenDeletePopup(false);
		setOpenUpdatePopup(false);
		setOpenAddImageAlert(false);
	};

	const onDelete = async (id) => {
		try {
			const { data } = await fetchContext.authAxios.delete(
				`/${authContext.authState.userInfo.role}/delete-team/${id}`
			);
			setSuccess(data.message);
			setError('');
		} catch (err) {
			const { data } = err.response;
			console.log(data.message);
		}
	};

	return (
		<>
			<TableHeader title="Teams" handleSearch={handleSearch} />
			<TblContainer>
				<TblHead />
				<TableBody>
					{recordsAfterPagingAndSorting().map((item, index) => (
						<TableRow key={index}>
							<TableCell>
								<Grid container alignItems="center" spacing={2}>
									<Grid item>
										{item.image && (
											<Avatar alt="Team Logo" src={`/images/${item.image}`} />
										)}
									</Grid>
									<Grid item>{item.teamName}</Grid>
								</Grid>
							</TableCell>
							<TableCell>
								<Grid container direction="column">
									{item?.players?.map((player, i) => (
										<Typography key={i} variant="caption" component="span">
											{player.name}
										</Typography>
									))}
								</Grid>
							</TableCell>
							<TableCell>{item.gameEvent}</TableCell>
							<TableCell align="center">
								<Tooltip title="Update">
									<IconButton
										aria-label="update"
										onClick={() => {
											setTeam(item);
											setGame(item.gameEvent);
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
											setTeam(item);
											setOpenDeletePopup(true);
										}}
									>
										<DeleteIcon color="error" />
									</IconButton>
								</Tooltip>
								<Tooltip title="Upload">
									<IconButton
										aria-label="upload"
										onClick={() => {
											setTeam(item);
											setOpenAddImageAlert(true);
										}}
									>
										<AddAPhotoIcon color="primary" />
									</IconButton>
								</Tooltip>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</TblContainer>
			<TblPagination />

			<PopupUpdate
				openUpdatePopup={openUpdatePopup}
				handleClose={handleClose}
				title={`Update ${game}`}
			>
				<Render team={team} game={game} />
			</PopupUpdate>
			<PopupDelete
				openDeletePopup={openDeletePopup}
				handleClose={handleClose}
				title="Delete User?"
				onDelete={onDelete}
				data={team}
				success={success}
				error={error}
				open={open}
				setOpen={setOpen}
				setFailed={setFailed}
				failed={failed}
			/>
			<PopupImageUpload
				openAddImageAlert={openAddImageAlert}
				handleClose={handleClose}
				inputEl={inputEl}
				team={team}
			/>
		</>
	);
};

export default TeamsTable;
