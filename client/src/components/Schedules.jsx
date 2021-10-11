import {
	Avatar,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@material-ui/core';
import { monthNames } from './../constants/month';

const Schedules = ({ schedules, change }) => {
	let schedByEvent = schedules.filter((sched) => sched.gameEvent === change);

	return (
		<>
			<TableContainer style={{ maxHeight: 400, minHeight: 400 }}>
				<Table aria-label="Teams table">
					<TableHead>
						<TableRow>
							<TableCell align="center">Teams to Compete</TableCell>
							<TableCell>Date</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{schedByEvent.length === 0 ? (
							<TableRow>
								<TableCell>No schedules yet</TableCell>
							</TableRow>
						) : (
							schedByEvent?.map((item, index) => {
								let dateOfTheMatch = new Date(item.date);
								let month = monthNames[dateOfTheMatch.getMonth()];
								let day = dateOfTheMatch.getDate();
								let year = dateOfTheMatch.getFullYear();

								return (
									<TableRow key={index}>
										<TableCell align="center">
											<Grid
												container
												alignItems="baseline"
												spacing={2}
												justifyContent="space-evenly"
											>
												<Grid item xs={12} md>
													<Grid
														container
														direction="column"
														alignItems="center"
														spacing={2}
														justifyContent="space-between"
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
												<Grid item xs={12} md>
													<Typography variant="overline">vs</Typography>
												</Grid>
												<Grid item xs={12} md>
													<Grid
														container
														direction="column"
														alignItems="center"
														spacing={2}
														justifyContent="space-between"
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
									</TableRow>
								);
							})
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default Schedules;
