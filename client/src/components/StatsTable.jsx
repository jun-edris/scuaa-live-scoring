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

const StatsTable = ({ gameEvent, players }) => {
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
								{gameEvent === 'basketball' && (
									<>
										<TableCell align="center">Fouls</TableCell>
									</>
								)}
								{gameEvent === 'soccer' && (
									<>
										<TableCell align="left">Yellow Cards</TableCell>
										<TableCell align="left">Red Cards</TableCell>
									</>
								)}
							</TableRow>
						</TableHead>
						<TableBody>
							{players?.map((player, index) => (
								<TableRow key={index}>
									<TableCell align="left">{player?.jerseyNumber}</TableCell>
									<TableCell align="left">{player?.name}</TableCell>
									<TableCell align="center">{player?.scores}</TableCell>
									{gameEvent === 'basketball' && (
										<>
											<TableCell align="center">{player?.fouls}</TableCell>
										</>
									)}
									{gameEvent === 'soccer' && (
										<>
											<TableCell align="left">{player?.card?.yellow}</TableCell>
											<TableCell align="left">{player?.card?.red}</TableCell>
										</>
									)}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</>
	);
};

export default StatsTable;
