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
import { FetchContext } from '../context/FetchContext';

const headCells = [
	{ id: 'teams', label: 'Teams to Compete' },
	{ id: 'date', label: 'Date' },
	{ id: 'time', label: 'Time' },
	{ id: 'sport', label: 'Sports Event' },
	{ id: 'buttons', label: '', disableSorting: true },
];
const ScheduleTable = ({ records }) => {
	const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
	const [openDeletePopup, setOpenDeletePopup] = useState(false);
	const fetchContext = useContext(FetchContext);
	const [schedules, setSchedules] = useState({});
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
	};

	return (
		<>
			<TableHeader title="Schedules" handleSearch={handleSearch} />
			<TblContainer>
				<TblHead />
				<TableBody>
					{recordsAfterPagingAndSorting().map((item, index) => {
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
													{item.teamOne.image && (
														<Avatar
															alt="Team Logo"
															src={`/images/${item.teamOne.image}`}
														/>
													)}
												</Grid>
												<Grid item>{item.teamOne.teamName}</Grid>
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
													{item.teamTwo.image && (
														<Avatar
															alt="Team Logo"
															src={`/images/${item.teamTwo.image}`}
														/>
													)}
												</Grid>
												<Grid item>{item.teamTwo.teamName}</Grid>
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
									<Typography>{item.gameEvent}</Typography>
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
											{item.isStarted === true ? (
												<CustomButton
													variant="contained"
													// onClick={() => {
													// 	setSelectedId(match._id);
													// 	onContinueMatch(match);
													// }}
													color="primary"
													title="Continue Match"
												/>
											) : (
												<CustomButton
													variant="contained"
													// onClick={() => {
													// 	setSelectedId(match._id);
													// 	startMatch(match);
													// 	onStartMatch(match);
													// }}
													color="primary"
													title="Start Match"
												/>
											)}
										</Grid>
									</Grid>
								</TableCell>
							</TableRow>
						);
					})}
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
			/>
		</>
	);
};

export default ScheduleTable;
