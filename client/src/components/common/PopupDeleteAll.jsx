import {
	Button,
	Dialog,
	DialogContent,
	Grid,
	Typography,
} from '@material-ui/core';
import SnackbarSuccess from './SnackbarSuccess';
import SnackbarError from './SnackbarError';

const PopupDeleteAll = ({
	title,
	openDeletePopup,
	handleClose,
	onDeleteAll,
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
								<Grid item>
									<Grid
										container
										direction="row"
										justifyContent="space-between"
										alignItems="center"
									>
										<Grid item>
											<Button
												color="primary"
												variant="contained"
												size="small"
												type="button"
												onClick={handleClose}
											>
												Disagree
											</Button>
										</Grid>
										<Grid item>
											<Button
												onClick={() => onDeleteAll()}
												color="primary"
												size="small"
												type="button"
												autoFocus
											>
												Agree
											</Button>
										</Grid>
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

export default PopupDeleteAll;
