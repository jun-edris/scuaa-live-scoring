import {
	Box,
	CircularProgress,
	FormControl,
	Grid,
	Hidden,
	IconButton,
	InputAdornment,
	Typography,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import { useContext, useEffect, useRef, useState } from 'react';
import { InputField } from './../components/common/InputField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import useStyles from './../styles/login';
import { validationSchema } from './../schema/login';
import CustomButton from '../components/common/CustomButton';
import { Redirect, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { publicFetch } from '../utils/fetch';
import SnackbarSuccess from './../components/common/SnackbarSuccess';
import SnackbarError from './../components/common/SnackbarError';

const Login = () => {
	const classes = useStyles();
	const _isMounted = useRef(true);
	const history = useHistory();
	const authContext = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [redirectLogin, setRedirectLogin] = useState(false);
	const [loginSuccess, setLoginSuccess] = useState();
	const [loginError, setLoginError] = useState();
	const [open, setOpen] = useState(false);
	const [role, setRole] = useState();
	const [failed, setFailed] = useState(false);

	useEffect(() => {
		if (!authContext.isAuthenticated()) {
			history.push('/');
		}
		return () => {
			_isMounted.current = false;
		};
	}, []);

	const login = async (credentials, resetForm) => {
		setLoading(true);

		await publicFetch
			.post('/signin', credentials)
			.then(({ data }) => {
				authContext.setAuthState(data);
				setLoginSuccess(data.message);
				setLoginError('');
				setOpen(true);
				setLoading(false);
				resetForm(true);
				setTimeout(() => {
					setRedirectLogin(true);
					setRole(data.userInfo.role);
				}, 400);
			})
			.catch((error) => {
				setLoginError(error?.response?.data?.message);
				setLoginSuccess('');
				setFailed(true);
				setLoading(false);
			});
		return _isMounted;
	};

	return (
		<>
			{redirectLogin &&
				(role === 'facilitator' || role === 'admin') &&
				authContext.isAuthenticated() && <Redirect to="dashboard" />}
			{redirectLogin && role === 'student' && authContext.isAuthenticated() && (
				<Redirect to="home" />
			)}
			{loginSuccess && (
				<SnackbarSuccess
					open={open}
					setOpen={setOpen}
					successMessage={loginSuccess}
				/>
			)}
			{loginError && (
				<SnackbarError
					open={failed}
					setOpen={setFailed}
					errorMessage={loginError}
				/>
			)}
			<Grid container direction="row" className={classes.root}>
				<Grid item xs={12} sm={6} md={8}>
					<Hidden xsDown implementation="css">
						<Grid container className={classes.backGroundSide}></Grid>
					</Hidden>
				</Grid>

				<Grid item xs={12} sm={6} md={4}>
					<Box px={4}>
						<Grid
							container
							direction="column"
							alignItems="stretch"
							justifyContent="center"
							className={classes.formSide}
						>
							<Grid item xs={12}>
								<Box>
									<Grid
										container
										direction="row"
										alignItems="flex-start"
										justifyContent="center"
									>
										<img
											src="images/186532331_162412032556911_1984827942288408119_n.png"
											alt="Ball"
											width="60px"
											height="60px"
										/>
										<Typography variant="h3" component="h1">
											SCUAA
										</Typography>
										<Typography variant="overline" component="span">
											live
										</Typography>
									</Grid>
								</Box>
							</Grid>
							<Grid item xs={12}>
								<Typography
									style={{
										marginTop: '30px',
									}}
									align="center"
									variant="body2"
									component="p"
								>
									Be updated on SCUAA's Basketball, Volleyball and Soccer Scores
									in one place
								</Typography>
							</Grid>

							<Grid item>
								<Box mt={4}>
									<Formik
										initialValues={{
											email: '',
											password: '',
										}}
										validationSchema={validationSchema}
										onSubmit={(values, { resetForm }) => {
											login(values, resetForm);
										}}
									>
										{() => (
											<Form autoComplete="off" noValidate>
												<Grid container direction="column">
													<Grid item xs={12}>
														<Box>
															<FormControl fullWidth>
																<InputField
																	name="email"
																	type="email"
																	label="Email"
																/>
															</FormControl>
														</Box>
													</Grid>
													<Grid item xs={12}>
														<Box mt={2}>
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
														</Box>
													</Grid>
													<Grid item xs={12}>
														<Box mt={1}>
															<CustomButton
																title="Sign In"
																type="submit"
																fullWidth
																variant="contained"
																color="primary"
																className={classes.submit}
																disabled={loading === true}
																startIcon={
																	loading === true ? (
																		<CircularProgress
																			size={20}
																			color="primary"
																		/>
																	) : null
																}
																autoComplete="off"
															/>
														</Box>
													</Grid>
												</Grid>
											</Form>
										)}
									</Formik>
								</Box>
							</Grid>
						</Grid>
					</Box>
				</Grid>
			</Grid>
		</>
	);
};

export default Login;
