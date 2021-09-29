import React, { useContext, useState } from 'react';
import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
	Grid,
	Button,
	CircularProgress,
} from '@material-ui/core';
import { FetchContext } from '../context/FetchContext';
import { AuthContext } from '../context/AuthContext';

const SubtituteTable = ({ matchId, gameEvent, players, user }) => {
	const [loading, setLoading] = useState(false);
	const fetchContext = useContext(FetchContext);
	const authContext = useContext(AuthContext);

	let sub = false;
	const subPlayer = async (subtituted, currentPlayer) => {
		try {
			setLoading(true);
			const subtitute = {
				subtituted: subtituted,
				matchId: matchId,
			};

			const { data } = await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/sub-player-team-one/${currentPlayer}`,
				subtitute
			);
			console.log(data.message);
			setLoading(false);
		} catch (error) {
			const { data } = error.response;
			console.log(data.message);
			setLoading(false);
		}
	};

	return (
		<>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell align="left">Jersey No.</TableCell>
							<TableCell align="left">Player Name</TableCell>
							<TableCell align="left">Scores</TableCell>
							{gameEvent === 'basketball' && (
								<>
									<TableCell align="left">Fouls</TableCell>
								</>
							)}
							{gameEvent === 'soccer' && (
								<>
									<TableCell align="left">Yellow Cards</TableCell>
									<TableCell align="left">Red Cards</TableCell>
								</>
							)}
							{user === authContext.authState.userInfo._id && (
								<TableCell align="left">Subtitute</TableCell>
							)}
						</TableRow>
					</TableHead>
					<TableBody>
						{players?.map((player, index) => (
							<TableRow key={index}>
								<TableCell align="left">{player?.jerseyNumber}</TableCell>
								<TableCell align="left">{player?.name}</TableCell>
								<TableCell align="left">{player?.scores}</TableCell>
								{gameEvent === 'basketball' && (
									<>
										<TableCell align="left">{player?.fouls}</TableCell>
									</>
								)}
								{gameEvent === 'soccer' && (
									<>
										<TableCell align="left">{player?.card?.yellow}</TableCell>
										<TableCell align="left">{player?.card?.red}</TableCell>
									</>
								)}
								{user === authContext.authState.userInfo._id && (
									<TableCell align="left">
										<Grid
											container
											spacing={4}
											justifyContent="space-between"
											alignItems="center"
										>
											{player.subtituted === false && (
												<Grid item>
													<Button
														variant="contained"
														style={{
															backgroundColor: '#4CAF50',
															color: 'white',
														}}
														size="small"
														fullWidth
														onClick={() => {
															sub = true;
															const currentPlayer = player._id;
															subPlayer(sub, currentPlayer);
														}}
														startIcon={
															loading === true ? (
																<CircularProgress size={20} color="secondary" />
															) : null
														}
													>
														IN
													</Button>
												</Grid>
											)}
										</Grid>
									</TableCell>
								)}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default SubtituteTable;
