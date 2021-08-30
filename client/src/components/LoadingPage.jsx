import { Grid } from '@material-ui/core';
import useStyles from './../styles/loadingpage';

const LoadingPage = () => {
	const classes = useStyles();
	return (
		<>
			<Grid
				container
				direction="row"
				justifyContent="center"
				alignItems="center"
				className={classes.root}
			>
				<img src="./images/loading-img.gif" alt="ball bouncing" />
			</Grid>
		</>
	);
};

export default LoadingPage;
