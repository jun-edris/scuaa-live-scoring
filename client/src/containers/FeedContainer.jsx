import React, { useContext, useEffect, useState } from 'react';
import FeedContent from '../components/FeedContent';
import { FetchContext } from '../context/FetchContext';
import useStyles from './../styles/feedContainer';
const FeedContainer = () => {
	const classes = useStyles();
	const fetchContext = useContext(FetchContext);
	const [live, setLive] = useState([]);

	const getLiveMatches = () => {
		fetchContext.authAxios
			.get('/all-done-live-match/')
			.then(({ data }) => {
				setLive(data);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		getLiveMatches();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchContext.refreshKey]);
	return (
		<section className={classes.root}>
			<div className={classes.content}>
				{live.length === 0
					? 'No live matches yet'
					: live.map((live, index) => (
							<div key={index}>
								<FeedContent live={live} />
							</div>
					  ))}
			</div>
		</section>
	);
};

export default FeedContainer;
