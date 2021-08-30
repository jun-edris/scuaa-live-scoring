import { Box, Divider, Grid, Typography } from '@material-ui/core';
import useStyles from './../styles/notfound';

export const NotFound = () => {
	const classes = useStyles();
	return (
		<div>
			<Grid
				container
				direction="column"
				justifyContent="center"
				alignItems="center"
				className={classes.container}
			>
				<Box px={2} py={4}>
					<Grid
						container
						direction="row"
						justifyContent="space-between"
						alignItems="center"
					>
						<Typography variant="h3">404</Typography>&nbsp;&nbsp;&nbsp;
						<Divider orientation="vertical" flexItem light />
						&nbsp;&nbsp;&nbsp;
						<Typography variant="subtitle1">page not found</Typography>
					</Grid>
				</Box>
			</Grid>
		</div>
	);
};

export default NotFound;
