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
const PopupDelete = ({
	title,
	onDelete,
	data,
	openDeletePopup,
	handleClose,
	onDeleteAll,
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
						justify="center"
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
							<Grid container direction="column" justify="center" spacing={2}>
								<Grid item>
									<Typography variant="h6" component="p" align="center">
										{title}
									</Typography>
								</Grid>
								<Grid item>
									<Grid
										container
										direction="row"
										justify="space-between"
										alignItems="center"
									>
										<Button
											color="primary"
											variant="contained"
											size="small"
											onClick={handleClose}
										>
											Disagree
										</Button>
										<Button
											color="primary"
											variant="contained"
											size="small"
											onClick={() =>
												data
													? onDelete(data._id)
													: onDeleteAll()
													? onDeleteAll()
													: null
											}
											disabled={loading === true}
											startIcon={
												loading === true ? (
													<CircularProgress size={20} color="primary" />
												) : null
											}
										>
											Agree
										</Button>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default PopupDelete;
