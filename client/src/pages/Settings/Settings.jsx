import {
	Box,
	CircularProgress,
	Container,
	Divider,
	Grid,
	Paper,
	Typography,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import HeaderCarousel from '../../components/HeaderCarousel';
import Header from '../../components/Header';
import useStyles from './../../styles/settings';
import SnackbarSuccess from '../../components/common/SnackbarSuccess';
import SnackbarError from '../../components/common/SnackbarError';
import { AuthContext } from '../../context/AuthContext';
import { FetchContext } from '../../context/FetchContext';
import CustomButton from '../../components/common/CustomButton';
import { InputField } from '../../components/common/InputField';
import { validationSchema } from '../../schema/changePassword';
import Footer from '../../components/Footer';

const Settings = () => {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const authContext = useContext(AuthContext);
	const fetchContext = useContext(FetchContext);
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [open, setOpen] = useState(false);
	const [failed, setFailed] = useState(false);

	const submitCredentials = async (credentials, resetForm) => {
		try {
			setLoading(true);
			const userData = {
				email: authContext.authState.userInfo.email,
				oldPassword: credentials.oldPassword,
				newPassword: credentials.newPassword,
			};

			const { data } = await fetchContext.authAxios.patch(
				'/change-password',
				userData
			);
			setOpen(true);
			setSuccessMessage(data.message);
			setLoading(false);
			resetForm(true);
		} catch (err) {
			const { data } = err.response;
			setErrorMessage(data.message);
			setFailed(true);
			setLoading(false);
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
			<section className={classes.root}>
				<Header />
				<div className={classes.full__slider}>
					<HeaderCarousel />
				</div>
			</section>
			<Box my={6}>
				<Container maxWidth="md">
					<Paper>
						<Box p={4}>
							<Typography variant="h4" component="p">
								User Information
							</Typography>
							<Divider></Divider>
							<Box mb={3}></Box>
							<Grid container justifyContent="flex-start">
								<Grid item md>
									<Grid container justifyContent="flex-start" spacing={4}>
										<Grid item>
											<Typography gutterBottom>Role:</Typography>
										</Grid>
										<Grid item>
											<Typography gutterBottom className={classes.textCapital}>
												{authContext.authState.userInfo.role}
											</Typography>
										</Grid>
									</Grid>
									<Grid container justifyContent="flex-start" spacing={4}>
										<Grid item>
											<Typography gutterBottom>First name:</Typography>
										</Grid>
										<Grid item>
											<Typography gutterBottom className={classes.textCapital}>
												{authContext.authState.userInfo.firstName}
											</Typography>
										</Grid>
									</Grid>
									<Grid container justifyContent="flex-start" spacing={4}>
										<Grid item>
											<Typography gutterBottom>Last name:</Typography>
										</Grid>
										<Grid item>
											<Typography gutterBottom className={classes.textCapital}>
												{authContext.authState.userInfo.lastName}
											</Typography>
										</Grid>
									</Grid>
									<Grid container justifyContent="flex-start" spacing={4}>
										<Grid item>
											<Typography gutterBottom>Email:</Typography>
										</Grid>
										<Grid item>
											<Typography gutterBottom>
												{authContext.authState.userInfo.email}
											</Typography>
										</Grid>
									</Grid>
								</Grid>
								<Divider orientation="vertical" flexItem></Divider>
								<Grid item md>
									<Box px={3}>
										<Formik
											initialValues={{
												oldPassword: '',
												newPassword: '',
												confirmPassword: '',
											}}
											validationSchema={validationSchema}
											onSubmit={(values, { resetForm }) => {
												submitCredentials(values, resetForm);
											}}
										>
											{({ values }) => (
												<Form noValidate>
													<Typography variant="h6" component="p">
														Change Password
													</Typography>
													<Box mb={2}></Box>
													<Grid container direction="column" spacing={3}>
														<Grid item>
															<InputField
																name="oldPassword"
																label="Old Password"
																autoComplete="off"
																type="password"
															/>
														</Grid>
														<Grid item>
															<InputField
																name="newPassword"
																label="New Password"
																autoComplete="off"
																type="password"
															/>
														</Grid>
														<Grid item>
															<InputField
																name="confirmPassword"
																label="Confirm New Password"
																autoComplete="off"
																type="password"
															/>
														</Grid>
														<Grid item>
															<CustomButton
																type="submit"
																color="primary"
																variant="contained"
																disabled={loading}
																startIcon={
																	loading === true ? (
																		<CircularProgress
																			size={20}
																			color="primary"
																		/>
																	) : null
																}
																fullWidth
																title="Submit"
															/>
														</Grid>
													</Grid>
												</Form>
											)}
										</Formik>
									</Box>
								</Grid>
							</Grid>
						</Box>
					</Paper>
				</Container>
			</Box>
			<Footer />
		</>
	);
};

export default Settings;
