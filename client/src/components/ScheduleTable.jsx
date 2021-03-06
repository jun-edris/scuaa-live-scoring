// TODO : Add "delete" and "delete all" feature

import { useContext, useState } from 'react';
import {
	TableBody,
	TableCell,
	TableRow,
	Typography,
	Grid,
	Avatar,
	Tooltip,
	IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import TableHeader from './TableHeader';
import ScheduleForm from './ScheduleForm';
import useTable from './../hooks/useTable';
import PopupUpdate from './common/PopupUpdate';
import PopupDelete from './common/PopupDelete';
import { monthNames } from './../constants/month';
import { formatAMPM } from './../mappers/formatTime';
import CustomButton from './common/CustomButton';
import { AuthContext } from '../context/AuthContext';
import { FetchContext } from '../context/FetchContext';
import { useHistory } from 'react-router-dom';

const headCells = [
	{ id: 'teams', label: 'Teams to Compete' },
	{ id: 'date', label: 'Date' },
	{ id: 'time', label: 'Time' },
	{ id: 'sport', label: 'Sports Event' },
	{ id: 'buttons', label: '', disableSorting: true },
];

const ScheduleTable = ({ records }) => {
	// const [live, setLive] = useState('');
	const history = useHistory();
	const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
	const [openDeletePopup, setOpenDeletePopup] = useState(false);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [failed, setFailed] = useState(false);
	const [error, setError] = useState();
	const [success, setSuccess] = useState();
	const [schedules, setSchedules] = useState({});
	const authContext = useContext(AuthContext);
	const fetchContext = useContext(FetchContext);
	const [filterFn, setFilterFn] = useState({
		fn: (items) => {
			return items;
		},
	});

	const dateNow = Date.now();
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
	};

	const startMatch = async (match) => {
		try {
			await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/start-schedule/${match._id}`
			);
		} catch (err) {
			const { data } = err.response;
			console.log(data.message);
		}
	};

	const onStartMatch = async (match) => {
		try {
			const liveMatch = {
				date: match.date,
				schedule: match._id,
				teamOne: match.teamOne,
				teamTwo: match.teamTwo,
			};
			const { data } = await fetchContext.authAxios.post(
				`facilitator/live-match/`,
				liveMatch
			);
			// setLive(data.newLiveMatch._id);
			createSet(data.newLiveMatch._id);
			updateLive(data.newLiveMatch._id);
		} catch (err) {
			return console.log(err.response.message);
		}
	};
	const createSet = async (live) => {
		try {
			await fetchContext.authAxios.post(`facilitator/set-match/${live}`);
		} catch (err) {
			setFailed(err.response.data.message);
			setOpen(true);
		}
	};
	const updateLive = async (live) => {
		try {
			await fetchContext.authAxios.patch(`facilitator/update-match/${live}`);
			return history.push(`/scoreboard/${live}`);
		} catch (err) {
			setFailed(err.response.data.message);
			setOpen(true);
		}
	};

	const onContinueMatch = async (match) => {
		try {
			const { data } = await fetchContext.authAxios.get(
				`/facilitator/continue-live-match/${match._id}`
			);
			setSuccess(data.message);

			return history.push(`/scoreboard/${data.liveMatch._id}`);
		} catch (err) {
			return console.log(err.response?.message);
		}
	};

	const onDelete = async (id) => {
		try {
			setLoading(true);
			const { data } = await fetchContext.authAxios.delete(
				`${authContext.authState.userInfo.role}/delete-schedule/${id}`
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
	};

	return (
		<>
			<TableHeader title="Schedules" handleSearch={handleSearch} />
			<TblContainer>
				<TblHead />
				<TableBody>
					{recordsAfterPagingAndSorting().length === 0 ? (
						<TableRow>
							<TableCell>No schedules</TableCell>
						</TableRow>
					) : (
						recordsAfterPagingAndSorting().map((item, index) => {
							let dateOfTheMatch = new Date(item.date);
							let month = monthNames[dateOfTheMatch.getMonth()];
							let day = dateOfTheMatch.getDate();
							let year = dateOfTheMatch.getFullYear();

							return (
								<TableRow key={index}>
									<TableCell align="center">
										<Grid container alignItems="center" spacing={2}>
											<Grid item>
												<Grid
													container
													direction="column"
													alignItems="center"
													spacing={2}
												>
													<Grid item>
														{item?.teamOne?.image && (
															<Avatar
																alt="Team Logo"
																src={`/images/${item.teamOne.image}`}
															/>
														)}
													</Grid>
													<Grid item>{item?.teamOne?.teamName}</Grid>
												</Grid>
											</Grid>
											<Grid item>
												<Typography variant="overline">vs</Typography>
											</Grid>
											<Grid item>
												<Grid
													container
													direction="column"
													alignItems="center"
													spacing={2}
												>
													<Grid item>
														{item?.teamTwo?.image && (
															<Avatar
																alt="Team Logo"
																src={`/images/${item.teamTwo.image}`}
															/>
														)}
													</Grid>
													<Grid item>{item?.teamTwo?.teamName}</Grid>
												</Grid>
											</Grid>
										</Grid>
									</TableCell>
									<TableCell>
										<Typography>{`${month} ${day}, ${year}`}</Typography>
									</TableCell>
									<TableCell>
										<Typography>{`${formatAMPM(dateOfTheMatch)}`}</Typography>
									</TableCell>
									<TableCell>
										<Typography>{item?.gameEvent}</Typography>
									</TableCell>
									<TableCell>
										<Grid container justifyContent="center" direction="column">
											<Grid item>
												<Tooltip title="Update">
													<IconButton
														aria-label="update"
														onClick={() => {
															setSchedules(item);
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
															setSchedules(item);
															setOpenDeletePopup(true);
														}}
													>
														<DeleteIcon color="error" />
													</IconButton>
												</Tooltip>
											</Grid>
											<Grid item>
												{/* <>{item?.date - }</> */}
												{item.isStarted === true ? (
													<CustomButton
														variant="contained"
														onClick={() => {
															onContinueMatch(item);
														}}
														color="primary"
														title="Continue Match"
													/>
												) : (
													<CustomButton
														variant="contained"
														// disabled={
														// 	Date.parse(new Date(dateNow)) -
														// 	Date.parse(item?.date) >= 0 ? true : false
														// }
														onClick={() => {
															startMatch(item);
															onStartMatch(item);
															// console.log();
															// // console.log(new Date(item?.date));
															// console.log(Date.parse(item?.date));
															// createSet();
														}}
														color="primary"
														title="Start Match"
													/>
												)}
											</Grid>
										</Grid>
									</TableCell>
								</TableRow>
							);
						})
					)}
				</TableBody>
			</TblContainer>
			<TblPagination />

			<PopupUpdate
				openUpdatePopup={openUpdatePopup}
				handleClose={handleClose}
				title="Update Schedule"
			>
				<ScheduleForm schedules={schedules} />
			</PopupUpdate>
			<PopupDelete
				openDeletePopup={openDeletePopup}
				handleClose={handleClose}
				title="Delete Schedule?"
				data={schedules}
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

export default ScheduleTable;
