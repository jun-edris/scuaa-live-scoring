import React from 'react';
import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
} from '@material-ui/core';

const ScoreTable = () => {
	return (
		<>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell align="left">Jersey No.</TableCell>
							<TableCell align="left">Player Name</TableCell>
							<TableCell align="left">Scores</TableCell>
							<TableCell align="left">Add Scores</TableCell>
							{/* <TableCell align="left">Fouls</TableCell>
							<TableCell align="left">Add Fouls</TableCell>
							<TableCell align="left">Yellow Cards</TableCell>
							<TableCell align="left">Add Yellow Card</TableCell>
							<TableCell align="left">Red Cards</TableCell>
							<TableCell align="left">Add Red Card</TableCell> */}
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell align="left">24</TableCell>
							<TableCell align="left">Kobe Bryant</TableCell>
							<TableCell align="left">0</TableCell>
							<TableCell align="left">Add Scores</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default ScoreTable;
