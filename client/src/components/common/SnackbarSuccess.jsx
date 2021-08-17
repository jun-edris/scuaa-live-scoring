import { Snackbar } from '@material-ui/core';
import Alert from './Alert';

const SnackbarSuccess = ({ open, setOpen, successMessage }) => {
	return (
		<>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				open={open}
				autoHideDuration={2000}
				onClose={() => setOpen(false)}
			>
				<Alert severity="success">{successMessage}</Alert>
			</Snackbar>
		</>
	);
};

export default SnackbarSuccess;
