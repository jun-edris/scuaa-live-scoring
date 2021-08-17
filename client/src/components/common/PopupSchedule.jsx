import {
	Dialog,
	DialogContent,
	DialogTitle,
	Typography,
} from '@material-ui/core';

const PopupSchedule = ({ openPopup, handleClose, title, children }) => {
	return (
		<Dialog open={openPopup} onClose={handleClose}>
			<DialogTitle>
				<Typography variant="subtitle1" component="p">
					{title}
				</Typography>
			</DialogTitle>
			<DialogContent>{children}</DialogContent>
		</Dialog>
	);
};

export default PopupSchedule;
