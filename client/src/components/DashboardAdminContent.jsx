import { Grid } from '@material-ui/core';
import LiveContainer from '../containers/LiveContainer';
import ScheduleContainer from '../containers/ScheduleContainer';
import TeamContainer from '../containers/TeamContainer';
import FacilitatorContainer from './../containers/FacilitatorContainer';

const DashboardAdminContent = () => {
	return (
		<>
			<Grid container direction="column" spacing={4}>
				<Grid item>
					<Grid container direction="row" spacing={2}>
						<Grid item xs={12} sm={6}>
							<FacilitatorContainer />
						</Grid>
						<Grid item xs={12} sm={6}>
							<TeamContainer />
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Grid container direction="row" spacing={2}>
						<Grid item xs={12} sm={6}>
							<ScheduleContainer />
						</Grid>
						<Grid item xs={12} sm={6}>
							<LiveContainer />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export default DashboardAdminContent;
