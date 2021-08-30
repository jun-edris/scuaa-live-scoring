import {
	Avatar,
	Box,
	Card,
	CardContent,
	Chip,
	Divider,
	Grid,
	Typography,
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import CustomButton from './common/CustomButton';
import useStyles from './../styles/feedContent';
import useWindowDimensions from '../hooks/useWindowDimensions';

const FeedContent = () => {
	const classes = useStyles();
	const { width } = useWindowDimensions();
	return (
		<>
			<Card className={classes.card}>
				<CardContent>
					<Grid container direction="column" justifyContent="center">
						<Grid item>
							<Box mb={1}>
								<Grid
									container
									direction="row"
									alignItems="center"
									justifyContent="space-between"
								>
									<Grid item>
										<Typography variant="h6">Soccer</Typography>
									</Grid>
									<Grid item>
										<Chip
											color="primary"
											label={<Typography variant="overline">Result</Typography>}
										/>
									</Grid>
								</Grid>
							</Box>
						</Grid>
						<Divider />
						<Grid item className={classes.content}>
							<Box px={width < 494 ? 1 : 4} py={2}>
								<Grid
									container
									direction="row"
									alignItems="center"
									justifyContent={
										width > 494 ? 'space-evenly' : 'space-between'
									}
								>
									<Grid item>
										<Grid
											container
											direction="column"
											alignItems="center"
											spacing={2}
										>
											<Grid item>
												<Avatar>
													<FolderIcon />
												</Avatar>
											</Grid>
											<Grid item>
												<Typography
													variant={width < 600 ? 'subtitle1' : 'h6'}
													component="h6"
												>
													Balilihan
												</Typography>
											</Grid>
										</Grid>
									</Grid>
									<Grid item>
										<Grid
											container
											direction="row"
											alignItems="stretch"
											justifyContent="center"
											spacing={2}
										>
											<Grid item>
												<Typography
													variant={width < 600 ? 'h4' : 'h2'}
													component="h6"
												>
													2
												</Typography>
											</Grid>
											<Grid item>
												<Typography
													variant={width < 600 ? 'h4' : 'h2'}
													component="h6"
												>
													:
												</Typography>
											</Grid>
											<Grid item>
												<Typography
													variant={width < 600 ? 'h4' : 'h2'}
													component="h6"
												>
													0
												</Typography>
											</Grid>
										</Grid>
									</Grid>
									<Grid item>
										<Grid
											container
											direction="column"
											alignItems="center"
											spacing={2}
										>
											<Grid item>
												<Avatar>
													<FolderIcon />
												</Avatar>
											</Grid>
											<Grid item>
												<Typography
													variant={width < 600 ? 'subtitle1' : 'h6'}
													component="h6"
												>
													Candijay
												</Typography>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Box>
						</Grid>
						<Grid item className={classes.cta}>
							<Grid
								container
								direction="row"
								justifyContent="center"
								alignItems="center"
							>
								<CustomButton
									title="See Stats"
									variant="contained"
									className={classes.btn}
								/>
							</Grid>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</>
	);
};

export default FeedContent;
