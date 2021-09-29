import {
	Avatar,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@material-ui/core';
import useStyles from './../styles/teams';

const Teams = ({ teams, change }) => {
	const classes = useStyles();

	let teamByEvent = teams.filter((team) => team.gameEvent === change);

	return (
		<>
			<TableContainer className={classes.root}>
				<Table aria-label="Teams table">
					<TableHead>
						<TableRow>
							<TableCell>Team</TableCell>
							<TableCell>Players</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{teamByEvent.length === 0 ? (
							<TableRow>
								<TableCell>No teams for this event yet</TableCell>
							</TableRow>
						) : (
							teamByEvent.map((team, index) => {
								return (
									<TableRow key={index}>
										<TableCell>
											<Grid container alignItems="center" spacing={2}>
												<Grid item>
													{team.image && (
														<Avatar
															alt="Team Logo"
															src={`/images/${team.image}`}
														/>
													)}
												</Grid>
												<Grid item>{team.teamName}</Grid>
											</Grid>
										</TableCell>
										<TableCell>
											<Grid container direction="column">
												{team?.players?.map((player, i) => (
													<Typography
														key={i}
														variant="caption"
														component="span"
													>
														{player.name}
													</Typography>
												))}
											</Grid>
										</TableCell>
									</TableRow>
								);
							})
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default Teams;
