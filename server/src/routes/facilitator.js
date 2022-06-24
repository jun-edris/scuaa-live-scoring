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
	getScheduleByMatch,
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
	addAssists,
	addSteal,
	addBlock,
	addRebound,
	addSpike,
	addDig,
	addSaveBall,
	addAce,
	addfoul,
	addyellowcard,
	addredcard,
	decScore,
	decAssist,
	decSteal,
	decBlock,
	decRebound,
	decSpike,
	decDig,
	decSaveBall,
	decAce,
	decfoul,
	decyellowcard,
	// decredcard,
	setwinner,
	setwinnerTeam,
	live,
	subPlayer,
	startTimer,
	setTime,
	setSets,
	matchSet,
	insertSet,
	resetSetVolleyball,
	getStats,
	getStat
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
router.get(
	'/facilitator/schedule/:id',
	checkJwt,
	requireFacilitator,
	getScheduleByMatch
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

router.patch(
	'/facilitator/start-time/:id',
	checkJwt,
	requireFacilitator,
	startTimer
);

router.patch('/facilitator/time/:id', checkJwt, requireFacilitator, setTime);

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
router.get('/set/:id/', checkJwt, getStat);
router.get('/sets/:id/', checkJwt, getStats);
router.get('/facilitator/continue-live-match/:id', checkJwt, continueLiveMatch);
router.get('/live/:id', checkJwt, live);

router.post(
	'/facilitator/live-match/',
	checkJwt,
	requireFacilitator,
	livematch
);
router.post(
	'/facilitator/set-match/:id',
	checkJwt,
	requireFacilitator,
	matchSet
);
router.patch(
	'/facilitator/update-match/:id',
	checkJwt,
	requireFacilitator,
	insertSet
);

router.patch(
	'/facilitator/sub-player-team-one/:id',
	checkJwt,
	requireFacilitator,
	subPlayer
);
// ADD STATS
router.patch('/facilitator/score/:id', checkJwt, requireFacilitator, addscore);
router.patch(
	'/facilitator/assist/:id',
	checkJwt,
	requireFacilitator,
	addAssists
);
router.patch('/facilitator/steal/:id', checkJwt, requireFacilitator, addSteal);
router.patch('/facilitator/block/:id', checkJwt, requireFacilitator, addBlock);
router.patch(
	'/facilitator/rebound/:id',
	checkJwt,
	requireFacilitator,
	addRebound
);
router.patch('/facilitator/spike/:id', checkJwt, requireFacilitator, addSpike);
router.patch('/facilitator/dig/:id', checkJwt, requireFacilitator, addDig);
router.patch(
	'/facilitator/save-ball/:id',
	checkJwt,
	requireFacilitator,
	addSaveBall
);
router.patch('/facilitator/ace/:id', checkJwt, requireFacilitator, addAce);

router.patch('/facilitator/foul/:id', checkJwt, requireFacilitator, addfoul);

router.patch(
	'/facilitator/add-yellow-card/:id',
	checkJwt,
	requireFacilitator,
	addyellowcard
);

router.patch(
	'/facilitator/add-red-card/:id',
	checkJwt,
	requireFacilitator,
	addredcard
);

// DECREASE STATS

router.patch(
	'/facilitator/dec-score/:id',
	checkJwt,
	requireFacilitator,
	decScore
);
router.patch(
	'/facilitator/dec-assist/:id',
	checkJwt,
	requireFacilitator,
	decAssist
);
router.patch(
	'/facilitator/dec-steal/:id',
	checkJwt,
	requireFacilitator,
	decSteal
);
router.patch(
	'/facilitator/dec-block/:id',
	checkJwt,
	requireFacilitator,
	decBlock
);
router.patch(
	'/facilitator/dec-rebound/:id',
	checkJwt,
	requireFacilitator,
	decRebound
);
router.patch(
	'/facilitator/dec-spike/:id',
	checkJwt,
	requireFacilitator,
	decSpike
);
router.patch('/facilitator/dec-dig/:id', checkJwt, requireFacilitator, decDig);
router.patch(
	'/facilitator/dec-save-ball/:id',
	checkJwt,
	requireFacilitator,
	decSaveBall
);
router.patch('/facilitator/dec-ace/:id', checkJwt, requireFacilitator, decAce);

router.patch(
	'/facilitator/dec-foul/:id',
	checkJwt,
	requireFacilitator,
	decfoul
);

router.patch(
	'/facilitator/dec-yellow-card/:id',
	checkJwt,
	requireFacilitator,
	decyellowcard
);

// router.patch(
// 	'/facilitator/dec-red-card/:id',
// 	checkJwt,
// 	requireFacilitator,
// 	decredcard
// );

// END STATS

router.patch('/facilitator/winner-of-the-game/:id', checkJwt, setwinner);

router.patch(
	'/facilitator/set-winner-of-the-game/:id',
	checkJwt,
	requireFacilitator,
	setwinnerTeam
);

router.patch('/facilitator/set-set/:id', checkJwt, requireFacilitator, setSets);
router.patch(
	'/facilitator/reset-set/:id',
	checkJwt,
	requireFacilitator,
	resetSetVolleyball
);

// LIVE END

module.exports = router;
