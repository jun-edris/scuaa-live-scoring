const express = require('express');
const {
	createschedule,
	getallschedule,
	getallschedulebyuser,
	deleteallmatch,
	deletematch,
	updateschedule,
	doneMatch,
	getNumberOfSchedule,
	startedmatch,
} = require('./../controllers/facilitator/schedule');

const {
	getdonelivematches,
	getnotdonelivematches,
	getalllivebyuser,
	getlivematches,
	getNumberOfLive,
	livematch,
	continueLiveMatch,
	addscore,
	addfoul,
	addyellowcard,
	addredcard,
	setwinner,
	setwinnerTeam,
	live,
	subPlayer,
} = require('./../controllers/facilitator/livematch');

const {
	checkJwt,
	attachUser,
	requireFacilitator,
} = require('./../middlewares/middleware');

const app = express();
const router = express.Router();

app.use(attachUser);
app.use((req, res, err, next) => {
	if (err.name === 'UnauthorizedError') {
		return res.status(403).send({
			success: false,
			message: 'No token provided.',
		});
	}
});

// SCHEDULES START

router.get('/schedules', checkJwt, getallschedule);
router.get('/number-schedules', checkJwt, getNumberOfSchedule);
router.get(
	'/facilitator/schedule-user',
	checkJwt,
	requireFacilitator,
	getallschedulebyuser
);

router.post(
	'/facilitator/schedule',
	checkJwt,
	requireFacilitator,
	createschedule
);

router.patch(
	'/facilitator/schedule/:id',
	checkJwt,
	requireFacilitator,
	updateschedule
);

router.patch(
	'/facilitator/done-schedule/:id',
	checkJwt,
	requireFacilitator,
	doneMatch
);

router.patch(
	'/facilitator/start-schedule/:id',
	checkJwt,
	requireFacilitator,
	startedmatch
);

router.delete(
	'/facilitator/delete-schedule/:id',
	checkJwt,
	requireFacilitator,
	deletematch
);

router.delete(
	'/facilitator/delete-all-schedule',
	checkJwt,
	requireFacilitator,
	deleteallmatch
);

// SCHEDULES END

// LIVE START

router.get('/all-live-match/', checkJwt, getlivematches);
router.get('/all-done-live-match/', checkJwt, getdonelivematches);
router.get('/all-not-done-live-match/', checkJwt, getnotdonelivematches);
router.get('/facilitator/user-live-match/', checkJwt, getalllivebyuser);

router.get('/number-live/', checkJwt, getNumberOfLive);
router.get('/facilitator/continue-live-match/:id', checkJwt, continueLiveMatch);
router.get('/live/:id', checkJwt, live);

router.post(
	'/facilitator/live-match/',
	checkJwt,
	requireFacilitator,
	livematch
);

router.patch(
	'/facilitator/sub-player-team-one/:id',
	checkJwt,
	requireFacilitator,
	subPlayer
);

router.patch('/facilitator/score/:id', checkJwt, requireFacilitator, addscore);

router.patch('/facilitator/foul/:id', checkJwt, requireFacilitator, addfoul);

router.patch(
	'/facilitator/add-yellow-card-player-team-one/:id',
	checkJwt,
	requireFacilitator,
	addyellowcard
);

router.patch(
	'/facilitator/add-red-card-player-team-one/:id',
	checkJwt,
	requireFacilitator,
	addredcard
);

router.patch('/facilitator/winner-of-the-game/:id', checkJwt, setwinner);

router.patch(
	'/facilitator/set-winner-of-the-game/:id',
	checkJwt,
	requireFacilitator,
	setwinnerTeam
);

// LIVE END

module.exports = router;
