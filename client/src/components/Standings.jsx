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

const Standings = () => {
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
						<TableRow>
							<TableCell>
								<Grid container alignItems="center" spacing={2}>
									<Grid item>
										<Avatar />
									</Grid>
									<Grid item>Balilihan</Grid>
								</Grid>
							</TableCell>
							<TableCell align="center">1</TableCell>
							<TableCell align="center">0</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<Grid container alignItems="center" spacing={2}>
									<Grid item>
										<Avatar />
									</Grid>
									<Grid item>Candijay</Grid>
								</Grid>
							</TableCell>
							<TableCell align="center">0</TableCell>
							<TableCell align="center">1</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default Standings;
