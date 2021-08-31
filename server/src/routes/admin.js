const express = require('express');
const {
	signup,
	getallusers,
	signupFacilitator,
	updateuser,
	updatefacilitator,
	deleteuser,
	deletealluser,
	getAllFacilitator,
} = require('./../controllers/admin/user');
const { changepassword } = require('./../controllers/login');
const {
	getallteam,
	getNumberOfTeams,
	addteam,
	uploadImage,
	updateteam,
	deleteteam,
	deleteallteam,
	getAllTeamsByRole,
} = require('./../controllers/admin/team');
const {
	checkJwt,
	attachUser,
	requireAdmin,
} = require('./../middlewares/middleware');
const { upload } = require('./../util');
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

// START USERS

//  GET

router.get('/hello', async (req, res) => {
	res.send('Hello World');
});

router.get('/admin/get-all-users', checkJwt, getallusers);
router.get('/get-all-facilitator', checkJwt, getAllFacilitator);

// POST
router.post('/admin/register', checkJwt, requireAdmin, signup);
router.post(
	'/admin/register-facilitator',
	checkJwt,
	requireAdmin,
	signupFacilitator
);

// UPDATE
router.patch('/change-password', checkJwt, changepassword);
router.patch('/admin/update-user/:id', checkJwt, requireAdmin, updateuser);
router.patch(
	'/admin/update-facilitator/:id',
	checkJwt,
	requireAdmin,
	updatefacilitator
);

// DELETE
router.delete('/admin/delete-user/:id', checkJwt, requireAdmin, deleteuser);
router.delete('/admin/delete-all-users', checkJwt, requireAdmin, deletealluser);

// END USERS

// START TEAMS

// GET
router.get('/get-all-teams', checkJwt, getallteam);
router.get('/get-number-teams', checkJwt, getNumberOfTeams);
router.get('/facilitator/team-by-event', checkJwt, getAllTeamsByRole);

// POST
router.post('/admin/team', checkJwt, requireAdmin, addteam);

// UPDATE
router.patch('/admin/update-team/:id', checkJwt, requireAdmin, updateteam);
router.patch(
	'/admin/upload-image/:id',
	checkJwt,
	requireAdmin,
	upload.single('photo'),
	uploadImage
);

// DELETE
router.delete('/admin/delete-all-team', checkJwt, requireAdmin, deleteallteam);
router.delete('/admin/delete-team/:id', checkJwt, requireAdmin, deleteteam);

// END TEAMS

module.exports = router;
