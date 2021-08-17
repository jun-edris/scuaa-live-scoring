import { Snackbar } from '@material-ui/core';
import Alert from './Alert';

const SnackbarError = ({ open, setOpen, errorMessage }) => {
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
				<Alert severity="error">{errorMessage}</Alert>
			</Snackbar>
		</>
	);
};

export default SnackbarError;
