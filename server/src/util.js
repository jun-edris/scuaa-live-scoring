const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const Pusher = require('pusher');
let path = require('path');

const createToken = (user) => {
	// Sign the JWT
	if (!user.role) {
		throw new Error('No user role specified');
	}
	if (!user._id) {
		throw new Error('No user id specified');
	}

	return jwt.sign(
		{
			sub: user._id,
			email: user.email,
			role: user.role,
			firstName: user.firstName,
			lastName: user.lastName,
			gameEvent: user.gameEvent ? user.gameEvent : '',
			iss: 'api.livescoring',
			aud: 'api.livescoring',
		},
		process.env.JWT_SECRET_KEY,
		{ algorithm: 'HS256', expiresIn: '5h' }
	);
};

const hashPassword = (password) => {
	return new Promise((resolve, reject) => {
		// Generate a salt at level 12 strength
		bcrypt.genSalt(12, (err, salt) => {
			if (err) {
				reject(err);
			}
			bcrypt.hash(password, salt, (err, hash) => {
				if (err) {
					reject(err);
				}
				resolve(hash);
			});
		});
	});
};

const verifyPassword = (passwordAttempt, hashedPassword) => {
	return bcrypt.compare(passwordAttempt, hashedPassword);
};

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '../client/public/images');
	},
	filename: function (req, file, cb) {
		cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
	},
});

const fileFilter = (req, file, cb) => {
	const allowedFileTypes = ['image/png'];
	if (allowedFileTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

let upload = multer({ storage, fileFilter });

function hasDuplicatesJerseyNumber(jersey) {
	return (
		new Set(jersey.map((item) => item.jerseyNumber))?.size !== jersey?.length
	);
}

function hasDuplicatesPlayerName(playerName) {
	return (
		new Set(playerName.map((item) => item.name))?.size !== playerName?.length
	);
}

const pusher = new Pusher({
	appId: process.env.APP_ID,
	key: process.env.APP_KEY,
	secret: process.env.APP_SECRET,
	cluster: process.env.APP_CLUSTER,
	useTLS: true,
});

module.exports = {
	createToken,
	hashPassword,
	verifyPassword,
	upload,
	hasDuplicatesPlayerName,
	hasDuplicatesJerseyNumber,
	pusher,
};
