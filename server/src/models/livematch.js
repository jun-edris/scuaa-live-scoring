const mongoose = require('mongoose');

const liveSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		schedule: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		teamOne: {
			_id: {
				type: mongoose.Types.ObjectId,
			},
			teamName: {
				type: String,
				required: true,
				trim: true,
				max: 50,
			},
			players: [
				{
					_id: {
						type: mongoose.Types.ObjectId,
					},
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
					card: {
						yellow: {
							type: Number,
							trim: true,
						},
						red: {
							type: Number,
							trim: true,
						},
					},
				},
			],
			image: {
				type: String,
			},
		},
		teamTwo: {
			_id: {
				type: mongoose.Types.ObjectId,
			},
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
					card: {
						yellow: {
							type: Number,
							trim: true,
						},
						red: {
							type: Number,
							trim: true,
						},
					},
				},
			],
			image: {
				type: String,
			},
		},
		gameEvent: {
			type: String,
			required: true,
			enum: ['basketball', 'volleyball', 'soccer'],
		},
		winner: {
			type: String,
			trim: true,
		},
		loser: {
			type: String,
			trim: true,
		},
		isStarted: {
			type: Boolean,
		},
		isDone: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('live-match', liveSchema);
