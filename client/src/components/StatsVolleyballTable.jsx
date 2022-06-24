import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core';
import React from 'react';

const StatsVolleyballTable = ({ players }) => {
	return (
		<>
			<Paper>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell align="left">Jersey No.</TableCell>
								<TableCell align="left">Player Name</TableCell>
								<TableCell align="center">Scores</TableCell>
								<TableCell align="center">Ace</TableCell>
								<TableCell align="center">Spike</TableCell>
								<TableCell align="center">Digs</TableCell>
								<TableCell align="center">Save Ball</TableCell>
								<TableCell align="center">Block</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{players?.map((player, index) => (
								<TableRow key={index}>
									<TableCell align="left">{player?.jerseyNumber}</TableCell>
									<TableCell align="left">{player?.name}</TableCell>
									<TableCell align="center">{player?.scores}</TableCell>
									<TableCell align="center">{player?.ace}</TableCell>
									<TableCell align="center">{player?.spike}</TableCell>
									<TableCell align="center">{player?.digs}</TableCell>
									<TableCell align="center">{player?.saveBall}</TableCell>
									<TableCell align="center">{player?.block}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</>
	);
};

export default StatsVolleyballTable;
