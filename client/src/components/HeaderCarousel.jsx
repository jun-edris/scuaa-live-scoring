import { Swiper, SwiperSlide } from 'swiper/react';
import clsx from 'clsx';
import useStyles from './../styles/headerCarousel';
import 'swiper/swiper-bundle.min.css';
import 'swiper/components/pagination/pagination.min.css';

import SwiperCore, { Pagination, Autoplay } from 'swiper/core';
import { Container, Grid, Typography } from '@material-ui/core';
SwiperCore.use([Pagination, Autoplay]);

const HeaderCarousel = () => {
	const classes = useStyles();
	return (
		<>
			<Swiper
				autoplay={{ delay: 3000 }}
				loop={true}
				pagination={{
					dynamicBullets: true,
				}}
				className={clsx(classes.mySwiper, classes.swiper__container)}
			>
				<SwiperSlide
					className={clsx(classes.swiper__slide, classes.slide__one)}
				>
					<Container maxWidth="md">
						<Grid container justifyContent="flex-end" alignItems="center">
							<Grid item md={5}>
								<Typography
									variant="h3"
									component="h6"
									className={clsx(classes.typoWhite, classes.textBold)}
								>
									Watch live scoring of SCUAA ball games
								</Typography>
							</Grid>
						</Grid>
					</Container>
				</SwiperSlide>
				<SwiperSlide
					className={clsx(classes.swiper__slide, classes.slide__two)}
				>
					<Container maxWidth="md">
						<Grid container justifyContent="flex-end" alignItems="center">
							<Grid item md={5}>
								<Typography
									variant="h3"
									component="h6"
									className={clsx(classes.typoWhite, classes.textBold)}
								>
									Watch live scoring of SCUAA ball games
								</Typography>
							</Grid>
						</Grid>
					</Container>
				</SwiperSlide>
				<SwiperSlide
					className={clsx(classes.swiper__slide, classes.slide__three)}
				>
					<Container maxWidth="md">
						<Grid container justifyContent="flex-end" alignItems="center">
							<Grid item md={5}>
								<Typography
									variant="h3"
									component="h6"
									className={clsx(classes.typoWhite, classes.textBold)}
								>
									Watch live scoring of SCUAA ball games
								</Typography>
							</Grid>
						</Grid>
					</Container>
				</SwiperSlide>
			</Swiper>
		</>
	);
};

export default HeaderCarousel;
