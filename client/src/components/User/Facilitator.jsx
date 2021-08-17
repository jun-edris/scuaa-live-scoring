import {
	CircularProgress,
	Container,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import CustomButton from '../common/CustomButton';
import { facilitatorSchema } from '../../schema/user';
import { InputField } from '../common/InputField';
import useStyles from '../../styles/userForm';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import GameSelection from '../common/GameSelection';
import { gameEvent } from '../../constants/selection';
import { FetchContext } from '../../context/FetchContext';
import { AuthContext } from '../../context/AuthContext';
import SnackbarSuccess from './../common/SnackbarSuccess';
import SnackbarError from './../common/SnackbarError';

const Facilitator = ({ user }) => {
	const classes = useStyles();
	const fetchContext = useContext(FetchContext);
	const authContext = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [success, setSuccess] = useState();
	const [error, setError] = useState();
	const [open, setOpen] = useState(false);
	const [failed, setFailed] = useState(false);

	const submitCredentials = async (credentials, resetForm) => {
		try {
			setLoading(true);
			const { data } = await fetchContext.authAxios.post(
				`/${authContext.authState.userInfo.role}/register-facilitator`,
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

	const updateCredentials = async (credentials, resetForm) => {
		try {
			setLoading(true);
			const { data } = await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/update-facilitator/${user._id}`,
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
			<Container maxWidth="xs">
				<Formik
					initialValues={{
						firstName: user ? user.firstName : '',
						lastName: user ? user.lastName : '',
						email: user ? user.email : '',
						password: user ? null : '',
						confirmPassword: user ? null : '',
						gameEvent: user ? user.gameEvent : '',
						role: 'facilitator',
					}}
					validationSchema={facilitatorSchema}
					onSubmit={(values, { resetForm }) => {
						if (user) {
							updateCredentials(values, resetForm);
						} else {
							submitCredentials(values, resetForm);
						}
					}}
				>
					{() => {
						return (
							<Form autoComplete="off" className={classes.form} noValidate>
								<Grid container spacing={1}>
									<Grid item xs={12}>
										<FormControl className={classes.formControl}>
											<InputLabel id="demo-simple-select-label">
												Game Event
											</InputLabel>
											<GameSelection name="gameEvent">
												<MenuItem value="">&nbsp;&nbsp;&nbsp;</MenuItem>
												{gameEvent.map((game, index) => (
													<MenuItem key={index} value={game.value}>
														{game.label}
													</MenuItem>
												))}
											</GameSelection>
										</FormControl>
									</Grid>
									<Grid item xs={12} sm={6}>
										<InputField
											name="firstName"
											type="text"
											label="First name"
											autoComplete="off"
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<InputField
											name="lastName"
											type="text"
											label="Last name"
											autoComplete="off"
										/>
									</Grid>
									<Grid item xs={12}>
										<InputField
											name="email"
											type="input"
											label="Email Address"
											autoComplete="off"
											id="email"
										/>
									</Grid>
									{!user && (
										<>
											<Grid item xs={12}>
												<FormControl fullWidth>
													<InputField
														name="password"
														type={showPassword ? 'text' : 'password'}
														label="Password"
														InputProps={{
															endAdornment: (
																<InputAdornment position="end">
																	<IconButton
																		aria-label="toggle password visibility"
																		onClick={() =>
																			setShowPassword(!showPassword)
																		}
																		onMouseDown={() =>
																			setShowPassword(!showPassword)
																		}
																		edge="end"
																	>
																		{showPassword ? (
																			<Visibility />
																		) : (
																			<VisibilityOff />
																		)}
																	</IconButton>
																</InputAdornment>
															),
														}}
													/>
												</FormControl>
											</Grid>
											<Grid item xs={12}>
												<InputField
													name="confirmPassword"
													label="Confirm Password"
													type="password"
													autoComplete="off"
												/>
											</Grid>
										</>
									)}
								</Grid>
								<CustomButton
									title="Sign In"
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
									// className={classes.submit}
									disabled={loading === true}
									startIcon={
										loading === true ? (
											<CircularProgress size={20} color="primary" />
										) : null
									}
								/>
							</Form>
						);
					}}
				</Formik>
			</Container>
		</>
	);
};

export default Facilitator;
