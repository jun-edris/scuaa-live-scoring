import {
	MuiPickersUtilsProvider,
	KeyboardDateTimePicker,
} from '@material-ui/pickers';
import {
	Box,
	Grid,
	FormHelperText,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	CircularProgress,
} from '@material-ui/core';
import CustomButton from './common/CustomButton';
import { scheduleSchema } from './../schema/schedule';
import { Field, Form, Formik, useField } from 'formik';
import DateFnsUtils from '@date-io/date-fns';
import { useContext, useEffect, useState } from 'react';
import { FetchContext } from '../context/FetchContext';
import { AuthContext } from '../context/AuthContext';
import useStyles from './../styles/scheduleForm';
import SnackbarSuccess from './common/SnackbarSuccess';
import SnackbarError from './common/SnackbarError';

const DateTimeField = ({ field, form, ...props }) => {
	const currentError = form.errors[field.name];

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardDateTimePicker
				clearable
				disablePast
				name={field.name}
				value={field.value}
				format="MM/dd/yyyy"
				helperText={currentError}
				error={!!currentError}
				onError={(error) => {
					if (error !== currentError) {
						form.setFieldError(field.name, error);
					}
				}}
				onChange={(date) => form.setFieldValue(field.name, date, true)}
				{...props}
			/>
		</MuiPickersUtilsProvider>
	);
};

const TeamSelection = ({ name, ...props }) => {
	const [field, meta] = useField(name);
	const errorText = meta.error && meta.touched ? meta.error : '';

	return (
		<>
			<Select
				name={field.name}
				{...field}
				fullWidth
				error={!!errorText}
				{...props}
			>
				{props.children}
			</Select>
			<FormHelperText error>{errorText}</FormHelperText>
		</>
	);
};
const ScheduleForm = ({ schedules }) => {
	const classes = useStyles();
	const fetchContext = useContext(FetchContext);
	const authContext = useContext(AuthContext);
	const [teams, setTeams] = useState([]);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState();
	const [error, setError] = useState();
	const [open, setOpen] = useState(false);
	const [failed, setFailed] = useState(false);

	const submitCredentials = async (credentials, resetForm) => {
		try {
			if (credentials.teamOne === credentials.teamTwo) {
				return;
			} else {
				setLoading(true);
				const { data } = await fetchContext.authAxios.post(
					`/${authContext.authState.userInfo.role}/schedule`,
					credentials
				);
				setSuccess(data.message);
				setError('');
				setOpen(true);
				setTimeout(() => {
					setLoading(false);
					resetForm(true);
				}, 400);
			}
		} catch (error) {
			setLoading(false);
			setError(error?.response?.message);
			setSuccess('');
			setOpen(true);
		}
	};

	const updateCredentials = async (credentials, resetForm) => {
		try {
			setLoading(true);
			const { data } = await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/schedule/${schedules._id}`,
				credentials
			);
			setSuccess(data.message);
			setError('');
			setOpen(true);
			setTimeout(() => {
				setLoading(false);
				resetForm(true);
			}, 400);
		} catch (error) {
			setLoading(false);
			const { data } = error.response;
			setError(data.message);
			setSuccess('');
			setOpen(true);
		}
	};

	const getSchedByEvent = () => {
		fetchContext.authAxios
			.get(`/${authContext.authState.userInfo.role}/team-by-event`)
			.then(({ data }) => {
				setTeams(data);
			});
	};

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			getSchedByEvent();
		}
		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{success && (
				<SnackbarSuccess
					open={open}
					setOpen={setOpen}
					successMessage={success}
				/>
			)}
			{error && (
				<SnackbarError open={failed} setOpen={setFailed} errorMessage={error} />
			)}
			<Formik
				initialValues={{
					date: schedules ? schedules.date : new Date(),
					teamOne: schedules ? schedules.teamOne._id : '',
					teamTwo: schedules ? schedules.teamTwo._id : '',
				}}
				validationSchema={scheduleSchema}
				onSubmit={(values, { resetForm }) => {
					if (schedules) {
						updateCredentials(values, resetForm);
					} else {
						submitCredentials(values, resetForm);
					}
				}}
			>
				{({ values }) => {
					return (
						<Form>
							<Grid container direction="column" alignItems="stretch">
								<Grid item xs={12}>
									<Box mb={4}>
										<Field
											name="date"
											label="Set date and time"
											component={DateTimeField}
											className={classes.pickers}
										/>
									</Box>
								</Grid>
								<Grid item xs={12}>
									<Grid
										container
										direction="row"
										alignItems="center"
										spacing={2}
									>
										<Grid item xs={6}>
											<FormControl className={classes.formControl}>
												<InputLabel id="demo-simple-select-label">
													Team A
												</InputLabel>
												<TeamSelection name="teamOne">
													<MenuItem value="">&nbsp;&nbsp;&nbsp;</MenuItem>
													{teams
														.filter((team) => team._id !== values?.teamTwo)
														.map((item, index) => (
															<MenuItem value={item._id} key={index}>
																{item.teamName}
															</MenuItem>
														))}
												</TeamSelection>
											</FormControl>
										</Grid>
										<Grid item xs={6}>
											<FormControl className={classes.formControl}>
												<InputLabel id="demo-simple-select-label">
													Team B
												</InputLabel>
												<TeamSelection name="teamTwo">
													<MenuItem value="">&nbsp;&nbsp;&nbsp;</MenuItem>
													{teams
														.filter((team) => team._id !== values?.teamOne)
														.map((item, index) => (
															<MenuItem value={item._id} key={index}>
																{item.teamName}
															</MenuItem>
														))}
												</TeamSelection>
											</FormControl>
										</Grid>
										<Grid item xs={12}>
											<Box my={2}>
												<CustomButton
													fullWidth
													variant="contained"
													title="Submit"
													color="primary"
													type="submit"
													disabled={loading === true}
													startIcon={
														loading === true ? (
															<CircularProgress size={20} color="secondary" />
														) : null
													}
												/>
											</Box>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Form>
					);
				}}
			</Formik>
		</>
	);
};

export default ScheduleForm;
