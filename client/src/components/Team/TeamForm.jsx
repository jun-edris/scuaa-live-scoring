import { teamSchema } from './../../schema/team';
import {
	Grid,
	Typography,
	IconButton,
	CircularProgress,
	Box,
	Divider,
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Form, Formik, FieldArray } from 'formik';
import { InputField } from '../common/InputField';
import CustomButton from './../common/CustomButton';
import { useContext, useState } from 'react';
import { FetchContext } from '../../context/FetchContext';
import { AuthContext } from '../../context/AuthContext';
import SnackbarSuccess from '../common/SnackbarSuccess';
import SnackbarError from './../common/SnackbarError';

const TeamForm = ({ game, team }) => {
	const [loading, setLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState();
	const [errorMessage, setErrorMessage] = useState();
	const [open, setOpen] = useState(false);
	const [failed, setFailed] = useState(false);
	const fetchContext = useContext(FetchContext);
	const authContext = useContext(AuthContext);

	const teamSubmit = async (values, resetForm) => {
		try {
			setLoading(true);
			const { data } = await fetchContext.authAxios.post(
				`${authContext.authState.userInfo.role}/team`,
				values
			);
			setSuccessMessage(data.message);
			setErrorMessage('');
			setOpen(true);
			setTimeout(() => {
				setLoading(false);
				resetForm(true);
			}, 400);
		} catch (error) {
			setLoading(false);
			const { data } = error.response;
			setErrorMessage(data.message);
			setSuccessMessage('');
			setOpen(true);
		}
	};

	return (
		<>
			{successMessage ? (
				<SnackbarSuccess
					open={open}
					setOpen={setOpen}
					successMessage={successMessage}
				/>
			) : null}
			{errorMessage ? (
				<SnackbarError
					open={failed}
					setOpen={setFailed}
					errorMessage={errorMessage}
				/>
			) : null}
			<Formik
				initialValues={{
					teamName: '',
					players: team ? team.players : [{ name: '', jerseyNumber: '' }],
					gameEvent: game,
				}}
				validationSchema={teamSchema}
				onSubmit={(values, { resetForm }) => {
					teamSubmit(values, resetForm);
				}}
			>
				{({ values }) => (
					<Form noValidate>
						<FieldArray name="players">
							{({ push, remove }) => (
								<Grid container direction="column" spacing={4}>
									<Grid item>
										<Grid container>
											<InputField
												type="text"
												name="teamName"
												label="Team Name"
											/>
										</Grid>
									</Grid>
									<Grid item>
										<Grid container direction="column" spacing={2}>
											{values.players.map((player, index) => (
												<Grid item key={index}>
													<Grid container direction="row" spacing={1}>
														<Grid item xs={12}>
															<Typography variant="subtitle2">
																Player {index + 1}
															</Typography>
														</Grid>
														<Grid item xs={5}>
															<InputField
																name={`players[${index}].name`}
																label="Player name"
																type="text"
															/>
														</Grid>
														<Grid item xs={5}>
															<InputField
																name={`players[${index}].jerseyNumber`}
																label="Jersey Number"
																type="number"
															/>
														</Grid>
														<Grid item xs={2}>
															{game === 'basketball' &&
															values.players.length > 5 ? (
																<Grid>
																	<IconButton
																		type="button"
																		color="secondary"
																		onClick={() =>
																			remove({ name: '', jerseyNumber: '' })
																		}
																	>
																		<HighlightOffIcon color="error" />
																	</IconButton>
																</Grid>
															) : game === 'volleyball' &&
															  values.players.length > 6 ? (
																<Grid>
																	<IconButton
																		type="button"
																		color="secondary"
																		onClick={() =>
																			remove({ name: '', jerseyNumber: '' })
																		}
																	>
																		<HighlightOffIcon color="error" />
																	</IconButton>
																</Grid>
															) : game === 'soccer' &&
															  values.players.length > 8 ? (
																<Grid>
																	<IconButton
																		type="button"
																		color="secondary"
																		onClick={() =>
																			remove({ name: '', jerseyNumber: '' })
																		}
																	>
																		<HighlightOffIcon color="error" />
																	</IconButton>
																</Grid>
															) : (
																''
															)}
														</Grid>
													</Grid>
												</Grid>
											))}
											<Grid item xs={12}>
												<CustomButton
													variant="contained"
													color="secondary"
													type="button"
													disabled={
														(game === 'basketball' &&
															values.players.length >= 15) ||
														(game === 'volleyball' &&
															values.players.length >= 12) ||
														(game === 'soccer' && values.players.length >= 18)
															? true
															: false
													}
													onClick={() => push({ name: '', jerseyNumber: '' })}
													fullWidth
													title="Add Player"
												/>
											</Grid>
											<Grid item xs={12}>
												<Divider />
												<Box mt={2}>
													<CustomButton
														type="submit"
														color="primary"
														variant="contained"
														disabled={
															(game === 'basketball' &&
																values.players.length < 5) ||
															(game === 'volleyball' &&
																values.players.length < 6) ||
															(game === 'soccer' &&
																values.players.length < 8) ||
															loading === true
																? true
																: false
														}
														// disabled={true}
														startIcon={
															loading === true ? (
																<CircularProgress size={20} color="primary" />
															) : null
														}
														fullWidth
														title="Submit"
													/>
												</Box>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							)}
						</FieldArray>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default TeamForm;
