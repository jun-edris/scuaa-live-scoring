import { List, ListItem, ListItemText } from '@material-ui/core';
import useStyles from './../styles/facilitators';

const Facilitators = ({ facilitator, game }) => {
	const classes = useStyles();

	let faciByEvent = facilitator.filter(
		(facilitator) => facilitator.gameEvent === game
	);
	return (
		<>
			<List className={classes.root}>
				{faciByEvent.length === 0 ? (
					<ListItem>No facilitators for this event yet</ListItem>
				) : (
					faciByEvent.map((user, index) => (
						<ListItem key={index}>
							<ListItemText
								primary={`${user.firstName} ${user.lastName}`}
								secondary={user.gameEvent}
							/>
						</ListItem>
					))
				)}
			</List>
		</>
	);
};

export default Facilitators;
