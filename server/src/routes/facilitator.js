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
	'facilitator/done-schedule/:id',
	checkJwt,
	requireFacilitator,
	doneMatch
);

router.patch(
	'facilitator/start-schedule/:id',
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
	'facilitator/delete-all-schedule',
	checkJwt,
	requireFacilitator,
	deleteallmatch
);

// SCHEDULES END

// LIVE START

// LIVE END

module.exports = router;
