import {
	Button,
	Dialog,
	DialogContent,
	Grid,
	Typography,
	CircularProgress,
} from '@material-ui/core';
import SnackbarSuccess from './SnackbarSuccess';
import SnackbarError from './SnackbarError';
import { Formik, Form } from 'formik';
const PopupDelete = ({
	title,
	onDelete,
	data,
	openDeletePopup,
	handleClose,
	loading,
	error,
	success,
	failed,
	setFailed,
	open,
	setOpen,
}) => {
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
			<Dialog open={openDeletePopup} onClose={handleClose}>
				<DialogContent>
					<Grid
						container
						direction="column"
						justifyContent="center"
						alignItems="center"
						spacing={2}
					>
						<Grid item xs={12}>
							<img
								src="/images/undraw_Throw_away_re_x60k.svg"
								alt="delete illustration"
								width="250"
								height="100"
							/>
						</Grid>
						<Grid item xs={12}>
							<Grid
								container
								direction="column"
								justifyContent="center"
								spacing={2}
							>
								<Grid item>
									<Typography variant="h6" component="p" align="center">
										{title}
									</Typography>
								</Grid>
								<Formik
									initialValues={{ data: data }}
									onSubmit={(values) => {
										if (values) {
											onDelete(values.data._id);
										}
									}}
								>
									{() => {
										return (
											<Form autoComplete="off" noValidate>
												<Grid item>
													<Grid
														container
														direction="row"
														justifyContent="space-between"
														alignItems="center"
													>
														<Button
															color="primary"
															variant="contained"
															size="small"
															type="button"
															onClick={handleClose}
														>
															Disagree
														</Button>
														<input type="text" name="data" hidden />
														<Button
															color="primary"
															size="small"
															type="submit"
															disabled={loading}
															startIcon={
																loading ? (
																	<CircularProgress size={20} color="primary" />
																) : null
															}
														>
															Agree
														</Button>
													</Grid>
												</Grid>
											</Form>
										);
									}}
								</Formik>
							</Grid>
						</Grid>
					</Grid>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default PopupDelete;
