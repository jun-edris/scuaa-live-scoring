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
					rebounds: {
						type: Number,
						default: 0,
						trim: true,
					},
					steal: {
						type: Number,
						default: 0,
						trim: true,
					},
					block: {
						type: Number,
						default: 0,
						trim: true,
					},
					assists: {
						type: Number,
						default: 0,
						trim: true,
					},
					spike: {
						type: Number,
						default: 0,
						trim: true,
					},
					digs: {
						type: Number,
						default: 0,
						trim: true,
					},
					saveBall: {
						type: Number,
						default: 0,
						trim: true,
					},
					ace: {
						type: Number,
						default: 0,
						trim: true,
					},
					fouls: {
						type: Number,
						default: 0,
						trim: true,
					},
					card: {
						yellow: {
							type: Number,
							default: 0,
							trim: true,
						},
						red: {
							type: Number,
							default: 0,
							trim: true,
						},
					},
					subtituted: {
						type: Boolean,
						trim: true,
						default: false,
					},
				},
			],
			image: {
				type: String,
			},
			wonSets: {
				type: Number,
				default: 0,
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
					rebounds: {
						type: Number,
						default: 0,
						trim: true,
					},
					steal: {
						type: Number,
						default: 0,
						trim: true,
					},
					block: {
						type: Number,
						default: 0,
						trim: true,
					},
					assists: {
						type: Number,
						default: 0,
						trim: true,
					},
					spike: {
						type: Number,
						default: 0,
						trim: true,
					},
					digs: {
						type: Number,
						default: 0,
						trim: true,
					},
					saveBall: {
						type: Number,
						default: 0,
						trim: true,
					},
					ace: {
						type: Number,
						default: 0,
						trim: true,
					},
					fouls: {
						type: Number,
						default: 0,
						trim: true,
					},
					card: {
						yellow: {
							type: Number,
							default: 0,
							trim: true,
						},
						red: {
							type: Number,
							default: 0,
							trim: true,
						},
					},
					subtituted: {
						type: Boolean,
						trim: true,
						default: false,
					},
				},
			],
			image: {
				type: String,
			},
			wonSets: {
				type: Number,
				default: 0,
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
		userName: {
			type: String,
			trim: true,
		},
		setName: {
			type: String,
		},
		sets: {
			type: mongoose.Types.ObjectId,
			ref: 'match-sets',
		},
		numSets: {
			type: Number,
		},
		fbLink: {
			type: String,
		},
		startTime: {
			type: Boolean,
			default: false,
		},
		timeGiven: {
			type: Number,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('live-match', liveSchema);
