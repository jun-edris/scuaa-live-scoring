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
	makeStyles,
} from '@material-ui/core';
import { FetchContext } from '../context/FetchContext';
import { AuthContext } from '../context/AuthContext';

const useStyles = makeStyles({
	tableContainer: {
		height: '90%',
		'&::-webkit-scrollbar': {
			width: '0.4em',
		},
		'&::-webkit-scrollbar-track': {
			'-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: 'rgba(255,255,255,.01)',
			borderRadius: '20px',
		},
		overflowX: 'auto',
		width: '100%',
	},
	table: {
		minWidth: 650,
		height: '100%',
		minHeight: 400,
	},
});

const SubtituteTable = ({ matchId, gameEvent, players, user, onCourt }) => {
	const classes = useStyles();
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
				<Table stickyHeader className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell align="left">Jersey No.</TableCell>
							<TableCell align="left">Player Name</TableCell>
							<TableCell align="left">Scores</TableCell>
							{gameEvent === 'basketball' && (
								<>
									<TableCell align="center">Assists</TableCell>
									<TableCell align="center">Rebounds</TableCell>
									<TableCell align="center">Steals</TableCell>
									<TableCell align="center">Block</TableCell>
									<TableCell align="left">Fouls</TableCell>
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
										<TableCell align="center">{player?.assists}</TableCell>
										<TableCell align="center">{player?.rebounds}</TableCell>
										<TableCell align="center">{player?.steal}</TableCell>
										<TableCell align="center">{player?.block}</TableCell>
										<TableCell align="center">{player?.fouls}</TableCell>
									</>
								)}
								{gameEvent === 'volleyball' && (
									<>
										<TableCell align="center">{player?.ace}</TableCell>
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
								{user === authContext.authState.userInfo._id && (
									<TableCell align="left">
										<Grid
											container
											spacing={4}
											justifyContent="space-between"
											alignItems="center"
										>
											{player.subtituted === false &&
												(player.fouls !== 5 ||
													player.card.yellow !== 2 ||
													player.card.red !== 1) && (
													<Grid item>
														<Button
															variant="contained"
															style={{
																backgroundColor: '#4CAF50',
																color: 'white',
															}}
															disabled={
																onCourt.length === 5 &&
																gameEvent === 'basketball'
																	? true
																	: onCourt.length === 6 &&
																	  gameEvent === 'volleyball'
																	? true
																	: onCourt.length === 8 &&
																	  gameEvent === 'soccer'
																	? true
																	: false
															}
															size="small"
															fullWidth
															onClick={() => {
																sub = true;
																const currentPlayer = player._id;
																subPlayer(sub, currentPlayer);
															}}
															startIcon={
																loading === true ? (
																	<CircularProgress
																		size={20}
																		color="secondary"
																	/>
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
