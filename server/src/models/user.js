const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
			max: 50,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
			max: 50,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			index: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			min: 3,
		},
		role: {
			type: String,
			required: true,
			enum: ['student', 'admin', 'facilitator'],
			default: 'student',
		},
		gameEvent: {
			type: String,
			required: false,
			enum: ['basketball', 'volleyball', 'soccer'],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('user', UserSchema);
