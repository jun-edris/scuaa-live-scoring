const express = require('express');
const { signin, logout } = require('../controllers/login');
const router = express.Router();

router.post('/signin', signin);
router.get('/logout', logout);

module.exports = router;
