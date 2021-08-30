import {
	Dialog,
	DialogContent,
	DialogTitle,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from '@material-ui/core';
import useStyles from './../../styles/popup';

const PopupDialog = ({
	title,
	children,
	openPopup,
	handleClose,
	role,
	setRole,
	data,
	selectionTitle,
	inputEl,
}) => {
	const classes = useStyles();
	return (
		<>
			<Dialog open={openPopup} onClose={handleClose} fullWidth ref={inputEl}>
				<DialogTitle>
					<Grid
						container
						direction="row"
						justifyContent="space-between"
						alignItems="center"
					>
						<Typography variant="subtitle1" component="p">
							{title}
						</Typography>
						<FormControl variant="outlined" className={classes.formControl}>
							<InputLabel id="role selector">{selectionTitle}</InputLabel>
							<Select
								labelId="role selector"
								value={role}
								onChange={(e) => setRole(e.target.value)}
								label={selectionTitle}
								size="small"
							>
								<MenuItem aria-label="None" value="">
									&nbsp;&nbsp;&nbsp;
								</MenuItem>
								{data?.map((user, index) => (
									<MenuItem
										aria-label={user.label}
										key={index}
										value={user.value}
									>
										{user.label}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
				</DialogTitle>
				<DialogContent>{children}</DialogContent>
			</Dialog>
		</>
	);
};

export default PopupDialog;
