const express = require('express');
const { signin, logout, changepassword } = require('../controllers/login');
const router = express.Router();
const { checkJwt } = require('./../middlewares/middleware');

router.post('/signin', signin);
router.get('/logout', logout);
router.patch('/change-password', checkJwt, changepassword);

module.exports = router;
