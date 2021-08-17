const express = require('express');
const cors = require('cors');
const jwt = require('express-jwt');
const app = express();
app.use(cors());

exports.attachUser = (req, res, next) => {
	const token = req.cookies.token;

	if (!token) {
		return res.status(401).json({ message: 'Authentication Invalid' });
	}

	const decodedToken = jwtDecode(token);

	if (!decodedToken) {
		return res
			.status(401)
			.json({ message: 'There was a problem in authorizing the request' });
	} else {
		req.user = decodedToken;
		next();
	}
};

exports.requireAdmin = (req, res, next) => {
	if (!req.user) {
		return res.status(401).json({
			message: 'There was a problem authorizing the request',
		});
	}
	if (req.user.role !== 'admin') {
		return res.status(401).json({ message: 'Insufficient role' });
	}
	next();
};

exports.requireFacilitator = (req, res, next) => {
	if (!req.user) {
		return res.status(401).json({
			message: 'There was a problem authorizing the request',
		});
	}
	if (req.user.role !== 'facilitator') {
		return res.status(401).json({ message: 'Insufficient role' });
	}
	next();
};

exports.requireStudent = (req, res, next) => {
	if (!req.user) {
		return res.status(401).json({
			message: 'There was a problem authorizing the request',
		});
	}
	if (req.user.role !== 'facilitator') {
		return res.status(401).json({ message: 'Insufficient role' });
	}
	next();
};

exports.checkJwt = jwt({
	secret: process.env.JWT_SECRET_KEY,
	algorithms: ['HS256'],
	issuer: 'api.livescoring',
	audience: 'api.livescoring',
	getToken: (req) => req.cookies.token,
});