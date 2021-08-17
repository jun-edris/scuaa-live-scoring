import { List, ListItem, ListItemText } from '@material-ui/core';
import useStyles from './../styles/facilitators';

const Facilitators = ({ facilitator, game }) => {
	const classes = useStyles();
	return (
		<>
			<List className={classes.root}>
				{facilitator
					.filter((user) => user.gameEvent === game)
					.map((user, index) => (
						<ListItem key={index}>
							<ListItemText
								primary={`${user.firstName} ${user.lastName}`}
								secondary={user.gameEvent}
							/>
						</ListItem>
					))}
			</List>
		</>
	);
};

export default Facilitators;
