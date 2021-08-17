import { Swiper, SwiperSlide } from 'swiper/react';
import {
	Avatar,
	Box,
	Container,
	Grid,
	Paper,
	Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import SwiperCore, { Navigation, Autoplay } from 'swiper/core';
import useStyles from './../styles/scheduleCarousel';
import 'swiper/swiper-bundle.min.css';
import 'swiper/components/navigation/navigation.min.css';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { useContext, useEffect, useState } from 'react';
import { FetchContext } from '../context/FetchContext';
import { AuthContext } from '../context/AuthContext';
import { formatAMPM } from './../mappers/formatTime';
import { monthNames } from './../constants/month';

SwiperCore.use([Navigation, Autoplay]);

const ScheduleCarousel = () => {
	const classes = useStyles();
	const { width } = useWindowDimensions();
	const fetchContext = useContext(FetchContext);
	const authContext = useContext(AuthContext);
	const [sched, setSched] = useState([]);
	
	const getAllSched = () => {
		fetchContext.authAxios.get(`/schedules`).then(({ data }) => {
			setSched(data);
		});
	};

	useEffect(() => {
		getAllSched();
		const schedChannel = authContext.pusher.subscribe('schedule');

		schedChannel.bind('created', (newSched) => {
			setSched((records) => [...sched, newSched]);
			fetchContext.setSched((sched) => [...fetchContext.sched, newSched]);
			fetchContext.setRefreshKey((fetchContext.refreshKey = +1));
		});
		return () => {
			schedChannel.unbind_all();
			schedChannel.unsubscribe('schedule');
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchContext.refreshKey]);

	return (
		<>
			<Container>
				<Swiper
					autoplay={{ delay: 3000 }}
					slidesPerView={
						width >= 830 ? 4 : width >= 960 ? 5 : width <= 375 ? 2 : 3
					}
					spaceBetween={20}
					className={clsx(classes.mySwiper, classes.swiper__container)}
				>
					{sched.map((item, index) => {
						let dateOfTheMatch = new Date(item.date);
						let month = monthNames[dateOfTheMatch.getMonth()];
						let day = dateOfTheMatch.getDate();
						let year = dateOfTheMatch.getFullYear();
						let currentDate = new Date();
						let currentDay = currentDate.getDate();

						return (
							<SwiperSlide key={index} className={classes.slide}>
								<Paper variant="outlined" square>
									<Box pt={1} pb={3}>
										<Grid
											container
											direction="column"
											justify="center"
											alignItems="center"
											spacing={2}
										>
											<Grid item xs={12}>
												<Typography variant="subtitle2" align="center">
													{currentDay === day
														? 'Today @ ' + formatAMPM(dateOfTheMatch)
														: currentDay + 1 === day
														? 'Tomorrow @ ' + formatAMPM(dateOfTheMatch)
														: month +
														  ' ' +
														  day +
														  ' ' +
														  year +
														  ' , @ ' +
														  formatAMPM(dateOfTheMatch)}
													{}
												</Typography>
											</Grid>

											<Grid
												container
												direction="row"
												justify="space-evenly"
												alignItems="center"
											>
												<Grid item>
													<Grid
														container
														direction="column"
														alignItems="center"
														justify="space-between"
													>
														<Grid item>
															<Avatar
																alt="Team Logo"
																src={`/images/${item.teamOne.image}`}
															/>
														</Grid>
														<Grid item>
															<Typography variant="overline">
																{item.teamOne.teamName}
															</Typography>
														</Grid>
													</Grid>
												</Grid>
												<Grid item>
													<Grid
														container
														direction="column"
														alignItems="center"
														justify="space-between"
													>
														<Grid item>
															<Typography variant="h6" component="span">
																VS
															</Typography>
														</Grid>
													</Grid>
												</Grid>
												<Grid item>
													<Grid
														container
														direction="column"
														alignItems="center"
														justify="space-between"
													>
														<Grid item>
															<Avatar
																alt="Team Logo"
																src={`/images/${item.teamTwo.image}`}
															/>
														</Grid>
														<Grid item>
															<Typography variant="overline">
																{item.teamTwo.teamName}
															</Typography>
														</Grid>
													</Grid>
												</Grid>
											</Grid>
										</Grid>
									</Box>
								</Paper>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</Container>
		</>
	);
};

export default ScheduleCarousel;
