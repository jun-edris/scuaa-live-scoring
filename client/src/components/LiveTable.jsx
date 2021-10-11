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

const LiveTable = ({ live, change }) => {
	let matchByEvent = live.filter((live) => live.gameEvent === change);

	return (
		<>
			<TableContainer style={{ maxHeight: 400, minHeight: 400 }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Competing Teams</TableCell>
							<TableCell>Status</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{matchByEvent.length === 0 ? (
							<TableRow>
								<TableCell>No live matches yet</TableCell>
							</TableRow>
						) : (
							matchByEvent.map((live, index) => (
								<TableRow key={index}>
									<TableCell>
										<Grid
											container
											direction="column"
											justifyContent="center"
											alignItems="stretch"
											spacing={2}
										>
											<Grid item md>
												<Grid
													container
													direction="row"
													alignItems="center"
													justifyContent="space-evenly"
													spacing={2}
												>
													<Grid item>
														<Grid
															container
															direction="column"
															alignItems="center"
															justifyContent="space-between"
														>
															<Grid item>
																<Avatar
																	alt="Team Logo"
																	src={`/images/${live?.teamOne?.image}`}
																/>
															</Grid>
															<Grid item>
																<Typography variant="overline">
																	{live?.teamOne?.teamName}
																</Typography>
															</Grid>
														</Grid>
													</Grid>
													<Grid item>
														<Grid
															container
															direction="column"
															alignItems="center"
															justifyContent="space-between"
														>
															<Grid item>
																<Typography variant="h6" component="span">
																	VS
																</Typography>
															</Grid>
														</Grid>
													</Grid>
													<Grid item>
														<Grid
															container
															direction="column"
															alignItems="center"
															justifyContent="space-between"
														>
															<Grid item>
																<Avatar
																	alt="Team Logo"
																	src={`/images/${live?.teamTwo?.image}`}
																/>
															</Grid>
															<Grid item>
																<Typography variant="overline">
																	{live?.teamTwo?.teamName}
																</Typography>
															</Grid>
														</Grid>
													</Grid>
												</Grid>
											</Grid>
										</Grid>
									</TableCell>

									{live.isDone === true ? (
										<TableCell>Done</TableCell>
									) : live.isStarted === true ? (
										<TableCell>On Going</TableCell>
									) : null}
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default LiveTable;
