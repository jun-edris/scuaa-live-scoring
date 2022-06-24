const mongoose = require('mongoose');

const setSchema = new mongoose.Schema(
	{
		liveMatch: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		sets: [
			{
				no: {
					type: Number,
				},
				teamOne: {
					teamName: {
						type: String,
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
						},
					],
				},
				teamTwo: {
					teamName: {
						type: String,
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
							ace: {
								type: Number,
								default: 0,
								trim: true,
							},
							saveBall: {
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
						},
					],
				},
				won: {
					type: String,
				},
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('match-sets', setSchema);
