const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema(
	{
		teamName: {
			type: String,
			required: true,
			trim: true,
			max: 50,
		},
		players: [
			{
				name: {
					type: String,
					required: true,
					trim: true,
					max: 50,
				},
				jerseyNumber: {
					type: String,
					required: true,
					trim: true,
				},
				scores: {
					type: Number,
					default: 0,
					trim: true,
				},
				fouls: {
					type: Number,
					trim: true,
				},
			},
		],
		gameEvent: {
			type: String,
			required: true,
			enum: ['basketball', 'volleyball', 'soccer'],
		},
		gamesWin: {
			type: Number,
			default: 0,
		},
		gamesLose: {
			type: Number,
			default: 0,
		},
		image: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('teams', TeamSchema);
