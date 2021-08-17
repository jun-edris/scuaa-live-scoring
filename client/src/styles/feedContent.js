import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
	card: {
		position: 'relative',
		overflow: 'visible',
		marginBottom: '50px',
		width: '100%',
		height: 'auto',
	},
	content: {
		width: '100%',
	},
	cta: {
		position: 'relative',
	},
	btn: {
		backgroundColor: '#d8302f',
		padding: '9px 25px',
		color: '#fff',
		fontSize: '13px',
		borderRadius: '50px',
		width: '200px',
		position: 'absolute',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, 5%)',
	},
}));
