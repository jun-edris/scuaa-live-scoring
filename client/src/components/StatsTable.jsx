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
										<TableCell align="center">Assists</TableCell>
										<TableCell align="center">Rebound</TableCell>
										<TableCell align="center">Steal</TableCell>
										<TableCell align="center">Block</TableCell>
										<TableCell align="center">Fouls</TableCell>
									</>
								)}
								{gameEvent === 'volleyball' && (
									<>
										<TableCell align="center">Ace</TableCell>
										<TableCell align="center">Spike</TableCell>
										<TableCell align="center">Digs</TableCell>
										<TableCell align="center">Save Ball</TableCell>
										<TableCell align="center">Block</TableCell>
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
											<TableCell align="center">{player?.assists}</TableCell>
											<TableCell align="center">{player?.rebounds}</TableCell>
											<TableCell align="center">{player?.steal}</TableCell>
											<TableCell align="center">{player?.block}</TableCell>
											<TableCell align="center">{player?.fouls}</TableCell>
										</>
									)}
									{gameEvent === 'volleyball' && (
										<>
											<TableCell align="center">
												{player?.ace ? player?.ace : 0}
											</TableCell>
											<TableCell align="center">{player?.spike}</TableCell>
											<TableCell align="center">{player?.digs}</TableCell>
											<TableCell align="center">{player?.saveBall}</TableCell>
											<TableCell align="center">{player?.block}</TableCell>
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
