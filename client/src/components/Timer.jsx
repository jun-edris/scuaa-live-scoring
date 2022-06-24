import { Button, Grid, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FetchContext } from '../context/FetchContext';

const padTime = (time) => {
	return String(time).length === 1 ? `0${time}` : `${time}`;
};

const format = (time) => {
	// Convert seconds into minutes and take the whole part
	const minutes = Math.floor(time / 60);

	// Get the seconds left after converting minutes
	const seconds = time % 60;

	//Return combined values as string in format mm:ss
	return `${padTime(minutes)}:${padTime(seconds)}`;
};

const formatSoccer = (time) => {
	// const hours = Math.floor(time / (60 * 60));
	const hours = Math.floor(time / 3600);
	// Convert seconds into minutes and take the whole part
	// const minutes = Math.floor(time / 60);
	const minutes = Math.floor((time - hours * 3600) / 60);

	// Get the seconds left after converting minutes
	const seconds = time % 60;

	//Return combined values as string in format mm:ss
	return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
};

const Timer = ({ live, setLive, teamOnePlayers, teamTwoPlayers }) => {
	const [active, setActive] = useState(false);
	const [counter, setCounter] = useState(live && live?.timeGiven);
	const authContext = useContext(AuthContext);
	const fetchContext = useContext(FetchContext);

	const startTime = async () => {
		try {
			await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/start-time/${live?._id}`
			);
		} catch (err) {
			console.log(err?.response?.message);
		}
	};

	const time = async () => {
		try {
			await fetchContext.authAxios.patch(
				`/${authContext.authState.userInfo.role}/time/${live?._id}`,
				counter
			);
		} catch (err) {
			console.log(err?.response?.message);
		}
	};

	useEffect(() => {
		const liveMatchChannel = authContext.pusher.subscribe('liveMatch');

		liveMatchChannel.bind('updated', function (updatedLiveMatch) {
			fetchContext.setLiveMatchList(
				fetchContext.liveMatchList.map((liveMatch) =>
					liveMatch._id === updatedLiveMatch._id
						? {
								...fetchContext.liveMatchList,
								updatedLiveMatch,
						  }
						: liveMatch
				)
			);
			setLive(updatedLiveMatch);
			fetchContext.setRefreshKey((fetchContext.refreshKey = +1));
		});
		return () => {
			liveMatchChannel.unbind_all();
			liveMatchChannel.unsubscribe('liveMatch');
		};
	}, [fetchContext.refreshKey]);

	useEffect(() => {
		let interval = null;

		if (live?.startTime === true && live?.timeGiven !== 0) {
			setActive(true);
			interval = setInterval(() => {
				setCounter((counter) => counter - 1);
				time();
			}, 1000);
		}

		if (live?.startTime === true && counter === 0) {
			startTime();
			setActive(false);
			clearInterval(interval);
		}
		if (live?.startTime === false || live?.timeGiven === 0) {
			setActive(false);
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [live?.startTime, counter]);

	return (
		<Grid container direction="column" alignItems="center" spacing={2}>
			<Grid item>
				<Typography variant="h3" component="span">
					{live?.gameEvent === 'soccer'
						? formatSoccer(live?.timeGiven)
						: format(live?.timeGiven)}
				</Typography>
			</Grid>
			{live?.user === authContext.authState.userInfo._id && (
				<Grid item>
					<Grid container>
						<Grid item>
							{live?.timeGiven !== 0 && (
								<Button
									variant="contained"
									onClick={() => startTime()}
									disabled={
										live?.gameEvent === 'basketball'
											? teamOnePlayers === 5 && teamTwoPlayers === 5
											: live?.gameEvent === 'soccer'
											? teamOnePlayers === 8 && teamTwoPlayers === 8
											: false
									}
								>
									{!active ? 'Start' : 'Timeout'}
								</Button>
							)}
						</Grid>
					</Grid>
				</Grid>
			)}
		</Grid>
	);
};

export default Timer;
