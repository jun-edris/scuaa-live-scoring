import React from 'react';
import FeedContent from '../components/FeedContent';
import useStyles from './../styles/feedContainer';
const FeedContainer = () => {
	const classes = useStyles();
	return (
		<section className={classes.root}>
			<div className={classes.content}>
				<FeedContent />
			</div>
		</section>
	);
};

export default FeedContainer;
