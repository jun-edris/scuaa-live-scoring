import {
	Avatar,
	Box,
	Chip,
	Divider,
	FormControl,
	Grid,
	InputLabel,
	List,
	ListItem,
	ListSubheader,
	MenuItem,
	Paper,
	Select,
	Typography,
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import { useState } from 'react';
import useWindowDimensions from '../hooks/useWindowDimensions';
import useStyles from './../styles/ingameList';
import CustomButton from './common/CustomButton';

const InGameList = () => {
	const classes = useStyles();
	const [change, setChange] = useState('basketball');
	const { width } = useWindowDimensions();
	return (
		<>
			<Grid
				container
				direction="column"
				justifyContent="flex-start"
				alignItems="center"
			>
				<List
					className={classes.root}
					subheader={
						<ListSubheader
							id="nested-list-subheader"
							style={{
								backgroundColor: '#fff',
								paddingTop: '10px',
								height: '100px',
							}}
						>
							<Grid
								container
								justifyContent="space-between"
								alignItems="center"
							>
								<Grid item>
									<Typography variant="h6">In Game</Typography>
								</Grid>
								<Grid item>
									<FormControl
										variant="outlined"
										className={classes.formControl}
									>
										<InputLabel id="Game-Selector">Game</InputLabel>
										<Select
											labelId="Game-Selector"
											id="demo-simple-select-outlined"
											value={change}
											onChange={(e) => setChange(e.target.value)}
											label="Game"
										>
											<MenuItem value="basketball">Basketball</MenuItem>
											<MenuItem value="volleyball">Volleyball</MenuItem>
											<MenuItem value="soccer">Soccer</MenuItem>
										</Select>
									</FormControl>
								</Grid>
							</Grid>
						</ListSubheader>
					}
					component={Paper}
				>
					<ListItem
						style={{
							marginBottom: '20px',
						}}
					>
						<Paper elevation={3} square className={classes.content}>
							<Box px={width < 1056 ? 1 : 3} pt={2} pb={1}>
								<Grid
									container
									direction="column"
									justifyContent="center"
									alignItems="stretch"
									spacing={2}
								>
									<Grid item>
										<Grid
											container
											direction="row"
											alignItems="center"
											justifyContent="space-between"
										>
											<Grid item>
												<Typography variant="h6" component="span">
													Basketball
												</Typography>
											</Grid>
											<Chip
												label={
													<Typography variant="caption">
														&bull;&nbsp;Live
													</Typography>
												}
											/>
										</Grid>
									</Grid>
									<Divider />
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
														<Avatar>
															<FolderIcon />
														</Avatar>
													</Grid>
													<Grid item>
														<Typography variant="overline">
															Balilihan
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
														<Avatar>
															<FolderIcon />
														</Avatar>
													</Grid>
													<Grid item>
														<Typography variant="overline">
															Balilihan
														</Typography>
													</Grid>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
									<Grid item>
										<CustomButton
											title="Watch"
											variant="contained"
											fullWidth
											color="primary"
										/>
									</Grid>
								</Grid>
							</Box>
						</Paper>
					</ListItem>
					<ListItem>
						<Paper elevation={3} square className={classes.content}>
							<Box px={width < 1056 ? 1 : 3} pt={2} pb={1}>
								<Grid
									container
									direction="column"
									justifyContent="center"
									alignItems="stretch"
									spacing={2}
								>
									<Grid item>
										<Grid
											container
											direction="row"
											alignItems="center"
											justifyContent="space-between"
										>
											<Grid item>
												<Typography variant="h6" component="span">
													Basketball
												</Typography>
											</Grid>
											<Chip
												label={
													<Typography variant="caption">&bull;Live</Typography>
												}
											/>
										</Grid>
									</Grid>
									<Divider />
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
														<Avatar>
															<FolderIcon />
														</Avatar>
													</Grid>
													<Grid item>
														<Typography variant="overline">
															Balilihan
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
														<Avatar>
															<FolderIcon />
														</Avatar>
													</Grid>
													<Grid item>
														<Typography variant="overline">
															Balilihan
														</Typography>
													</Grid>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
									<Grid item>
										<CustomButton
											title="Watch"
											variant="contained"
											fullWidth
											color="primary"
										/>
									</Grid>
								</Grid>
							</Box>
						</Paper>
					</ListItem>
				</List>
			</Grid>
		</>
	);
};

export default InGameList;
