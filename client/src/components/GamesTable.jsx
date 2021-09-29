import {
	Avatar,
	Button,
	Grid,
	TableBody,
	TableCell,
	TableRow,
	Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { monthNames } from '../constants/month';
import useTable from '../hooks/useTable';
import { formatAMPM } from '../mappers/formatTime';
import PDFResult from './PDFResult';
import TableHeader from './TableHeader';

const headCells = [
	{ id: 'teams', label: 'Teams' },
	{ id: 'date', label: 'Date' },
	{ id: 'time', label: 'Time' },
	{ id: 'sport', label: 'Sports Event' },
	{ id: 'buttons', label: '', disableSorting: true },
];

const GamesTable = ({ records }) => {
	const [filterFn, setFilterFn] = useState({
		fn: (items) => {
			return items;
		},
	});

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

	const { TblContainer, TblHead, recordsAfterPagingAndSorting, TblPagination } =
		useTable(records, headCells, filterFn);

	return (
		<>
			<TableHeader title="Matches" handleSearch={handleSearch} />
			<TblContainer>
				<TblHead />
				<TableBody>
					{recordsAfterPagingAndSorting().length === 0 ? (
						<TableRow>
							<TableCell>No matches found</TableCell>
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
										<Button variant="contained" color="primary">
											<PDFDownloadLink
												document={<PDFResult data={item} />}
												fileName={`${item.teamOne?.teamName}_vs_${item.teamTwo?.teamName}-${month}-${day}-${year}.pdf`}
											>
												{({ blob, url, loading, error }) =>
													loading
														? 'Loading document...'
														: 'Download PDF Result!'
												}
											</PDFDownloadLink>
										</Button>
									</TableCell>
								</TableRow>
							);
						})
					)}
				</TableBody>
			</TblContainer>
			<TblPagination />
		</>
	);
};

export default GamesTable;
