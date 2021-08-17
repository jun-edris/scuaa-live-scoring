import {
	Dialog,
	DialogContent,
	DialogTitle,
	Typography,
} from '@material-ui/core';
const PopupUpdate = ({ openUpdatePopup, handleClose, title, children }) => {
	return (
		<>
			<Dialog open={openUpdatePopup} onClose={handleClose}>
				<DialogTitle>
					<Typography variant="subtitle1" component="p">
						{title}
					</Typography>
				</DialogTitle>
				<DialogContent>{children}</DialogContent>
			</Dialog>
		</>
	);
};

export default PopupUpdate;
