import {
	Avatar,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core';
import useStyles from './../styles/standings';

const Standings = ({ teams, change }) => {
	const classes = useStyles();
	return (
		<>
			<TableContainer className={classes.root}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Team</TableCell>
							<TableCell align="center">Win</TableCell>
							<TableCell align="center">Lose</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{teams
							.filter((team) => team.gameEvent === change)
							.map((team, index) => {
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
										<TableCell align="center">{team.gamesWin}</TableCell>
										<TableCell align="center">{team.gamesLose}</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default Standings;
